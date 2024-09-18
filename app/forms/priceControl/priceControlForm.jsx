import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, FlatList, Alert, Pressable, Platform, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import { Audio } from 'expo-av';
import { useLocalSearchParams, router } from 'expo-router';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import MediaPickerModal from '@/components/mediaPickerModal';
import LocationDropdown from '@/components/locationDropdown';
import {dbDate } from '@/utils/formatDate';
import DateTimePicker from '@react-native-community/datetimepicker';
import { handleInspectionSubmission } from '@/utils/priceControlUtils';
import useHeaderTitle from '@/hooks/useHeaderTitle';
import AttachmentPreview from '../../../components/attachmentPreview';
import { splitDateTime, requestPermissions } from '../../../utils/helpers';

const PriceControlForm = () => {
  useEffect(() => {
    const getPermissions = async () => {
      await requestPermissions();
    };

    getPermissions();
  }, []);

  useHeaderTitle('Price Control Form');
  const dispatch = useDispatch();
  const { id } = useLocalSearchParams();
  const inspections = useSelector((state) => state.priceControl.allInspections);
  const offlineInspections = useSelector((state) => state.priceControl.offlineInspections);
  const inspection = inspections?.find((ins) => ins.id === id) || {};
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [dateOfList, setDateOfList] = useState('');
  const [timeOfList, setTimeOfList] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [mediaType, setMediaType] = useState('');
  const [shopsVisited, setShopsVisited] = useState(inspection?.shops_visited?.toString() || '');
  const [shopsSealed, setShopsSealed] = useState(inspection?.shops_sealed?.toString() || '');
  const [violations, setViolations] = useState(inspection?.violations?.toString() || '');
  const [compliances, setCompliances] = useState(inspection?.compliances?.toString() || '');
  const [warningsIssued, setWarningsIssued] = useState(inspection?.warnings_issued?.toString() || '');
  const [arrestsMade, setArrestsMade] = useState(inspection?.arrests_made?.toString() || '');
  const [fIRsRegistered, setFIRsRegistered] = useState(inspection?.firs_registered?.toString() || '');
  const [finesIssued, setFinesIssued] = useState(inspection?.fines_issued?.toString() || '');
  const [location, setLocation] = useState(inspection?.location || '');
  const [attachments, setAttachments] = useState(inspection?.attachments || []);

  useEffect(() => {
    if (inspection.datetime) {
      try {
        const { date, time } = splitDateTime(inspection.datetime);
        setDateOfList(date);
        setTimeOfList(time);
      } catch (error) {
        console.error('Error splitting datetime:', error);
      }
    }
  }, [inspection.datetime]);

  const handleSubmit = async () => {
    // Validate that both date and time are selected
    if (!dateOfList || !timeOfList) {
      Alert.alert('Missing Fields', 'Please select both date and time.');
      return;
    }

    // Combine dateOfList and timeOfList into a single Date object
    const combinedDateTime = new Date(`${dateOfList} ${timeOfList}`);
    
    if (isNaN(combinedDateTime)) {
      Alert.alert('Invalid Date/Time', 'Please ensure date and time are correctly selected.');
      return;
    }
    const newInspection = {
      location,
      datetime: combinedDateTime.toISOString(),
      shopsVisited,
      shopsSealed,
      violations,
      compliances,
      warningsIssued,
      arrestsMade,
      fIRsRegistered,
      finesIssued,
      attachments,
    };
    if (id) {
      newInspection.id = id;
      await handleInspectionSubmission(dispatch, newInspection, offlineInspections);
    } else {
      await handleInspectionSubmission(dispatch, newInspection, offlineInspections);
    }
    router.back();
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  }
  const toggleTimePicker = () => {
    setShowTimePicker(!showTimePicker);
  }

  const onChange = ({ type }, selectedDate) => {
    if (type == 'set') {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === 'android') {
        toggleDatePicker();
        setDateOfList(currentDate.toDateString());
      }
    } else {
      toggleDatePicker();
    }
  }

  const onChangeTime = ({ type }, selectedTime) => {
    if (type == 'set') {
      const currentTime = selectedTime;
      setTime(currentTime);

      if (Platform.OS === 'android') {
        toggleTimePicker();
        setTimeOfList(currentTime.toTimeString());
      }
    } else {
      toggleTimePicker();
    }
  }

  const confirmDateOfList = () => {
    setDateOfList(date.toDateString());
    toggleDatePicker();
  }

  const confirmTimeOfList = () => {
    setTimeOfList(time.toTimeString());
    toggleTimePicker();
  }

  const openModal = (type) => {
    setMediaType(type);
    setModalVisible(true);
  };

  const imgDir = FileSystem.documentDirectory + 'gogb/';
    const ensureDirExits = async()=> {
    const dirInfo = await FileSystem.getInfoAsync(imgDir);
    if(!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(imgDir, {intermediates:true});
    }
  };
  const saveFile = async (uri, ext) => {
    await ensureDirExits();
    const fileName = dbDate() + ext;
    const dest = imgDir + fileName;
    await FileSystem.copyAsync({from:uri, to:dest})
  }
  
  // Existing image picker function
  const handlePhotoPick = async (tool) => {
    let result;
    if (tool === 'camera') {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false, 
        allowsEditing:false,
      });
      if (!result.canceled) {
        await saveFile(result.assets[0].uri, '.jpg');
        setAttachments([...attachments, { type: result.assets[0].mimeType, uri: result.assets[0].uri, name: result.assets[0].fileName, view: 'image' }]);
      }
    } else {
        result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true, 
        allowsEditing:false,
        });
    }
    if (!result.canceled) {
      const newAttachments = result.assets.map(asset => ({
        type: asset.mimeType,
        uri: asset.uri,
        name: asset.fileName,
        view: 'image',
      }));
      setAttachments([...attachments, ...newAttachments]);

    }
  };
  
  // New video picker function
  const handleVideoPick = async (tool) => {
    let result;
    if (tool === 'camera') {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsMultipleSelection: false, 
      });
      if (!result.canceled) {
        await saveFile(result.assets[0].uri, '.mp4');
        setAttachments([...attachments, { type: result.assets[0].mimeType, uri: result.assets[0].uri, name: result.assets[0].fileName, view: 'video' }]);
      }
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsMultipleSelection: true, 
      });
    }
    if (!result.canceled) {
      const newAttachments = result.assets.map(asset => ({
        type: asset.mimeType,
        uri: asset.uri,
        name: asset.fileName,
        view: 'video',
      }));
      setAttachments([...attachments, ...newAttachments]);
    }
  };
  
  // New document picker function
  const handleDocumentPick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          'application/pdf',
          'application/msword',
          'application/vnd.ms-excel',
          'text/plain',
        ],
        multiple: true,
      });
  
      console.log('DocumentPicker result:', result);  // Log the result to verify the output
  
      if (!result.canceled) {
        const newAttachments = result.assets.map((asset) => ({
          uri: asset.uri,
          name: asset.name,
          type: asset.mimeType,
          view: 'document',
        }));
        setAttachments([...attachments, ...newAttachments]);
      }
    } catch (err) {
      console.error('Error picking document:', err);
    }
  };

  const handleAudioPick = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'audio/*',
      multiple: true,
    });
    if (!result.canceled) {
      const newAttachments = result.assets.map(asset => ({
        uri: asset.uri,
        name: asset.name,
        type: asset.mimeType,
        view: 'audio',
      }));
      setAttachments([...attachments, ...newAttachments]);
    }
  };

  const handleRecordAudio = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access microphone was denied');
        return;
      }
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();
      const stopButtonPressed = new Promise((resolve) => {
        setTimeout(() => resolve(), 30000);
      });
      await stopButtonPressed;
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      if (uri) {
        const savedFilePath = await saveFile(uri, '.m4a'); 
        setAttachments([...attachments, { uri: savedFilePath, name: dbDate() +'audio.m4a', type: 'audio/m4a', view: 'audio' }]);
      }
    } catch (error) {
      console.error('Error recording audio:', error);
    }
  };

  const getSelectFunction = () => {
    switch (mediaType) {
      case 'photo':
        return (tool) => handlePhotoPick(tool);
      case 'audio':
        return (type) => (type === 'mic' ? handleRecordAudio() : handleAudioPick());
      case 'document':
        return handleDocumentPick;
      case 'video':
        return (tool) => handleVideoPick(tool);
      default:
        return () => {};
    }
  };

  const removeAttachment = (index) => {
    const updatedAttachments = [...attachments];
    updatedAttachments.splice(index, 1);
    setAttachments(updatedAttachments);
  };


  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{id? "Update Inspection": "New Inspection"}</Text>
          </View>

          <View style={styles.itemContainerFull}>
            <View style={[styles.item, { zIndex: 100, overflow: 'visible' }]}>
              <Text style={styles.label}>Location</Text>
              <LocationDropdown
                value={location}
                onValueChange={setLocation}
                containerStyle={{ zIndex: 100 }}
              />
            </View>
          </View>

          <View style={styles.itemContainerHalf}>
            <View style={styles.item}>
              <Text style={styles.label}>Date</Text>
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode={'date'}
                  display='spinner'
                  onChange={onChange}
                  style={styles.datePicker}
                />
              )}
              {showDatePicker && Platform.OS === "ios" && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around"
                  }}
                >
                  <TouchableOpacity style={[
                    styles.button,
                    styles.pickerButton,
                    {backgroundColor: "#11182711"}
                  ]}
                    onPress={toggleDatePicker}
                  >
                    <Text 
                      style={[
                        styles.buttonText,
                        {color: "#075985"}
                      ]}
                    >Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[
                    styles.button,
                    styles.pickerButton,
                  ]}
                    onPress={confirmDateOfList}
                  >
                    <Text 
                      style={[
                        styles.buttonText,
                      ]}
                      >Confirm</Text>
                  </TouchableOpacity>
                </View>
              )}
              {!showDatePicker && (
                <Pressable onPress={toggleDatePicker}>
                  <TextInput
                    style={styles.input}
                    placeholder='Select date'
                    value={dateOfList}
                    onChangeText={setDateOfList}
                    placeholderTextColor='#11182744'
                    editable={false}
                    onPressIn={toggleDatePicker}
                  />
                </Pressable>
              )}
            </View>
          </View>
          <View style={styles.itemContainerHalf}>
            <View style={styles.item}>
              <Text style={styles.label}>Time</Text>
              {showTimePicker && (
                <DateTimePicker
                  value={time}
                  mode={'time'}
                  display='spinner'
                  onChange={onChangeTime}
                  style={styles.timePicker}
                />
              )}
              {showTimePicker && Platform.OS === "ios" && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around"
                  }}
                >
                  <TouchableOpacity style={[
                    styles.button,
                    styles.pickerButton,
                    {backgroundColor: "#11182711"}
                  ]}
                    onPress={toggleTimePicker}
                  >
                    <Text 
                      style={[
                        styles.buttonText,
                        {color: "#075985"}
                      ]}
                    >Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[
                    styles.button,
                    styles.pickerButton,
                  ]}
                    onPress={confirmTimeOfList}
                  >
                    <Text 
                      style={[
                        styles.buttonText,
                      ]}
                      >Confirm</Text>
                  </TouchableOpacity>
                </View>
              )}
              {!showTimePicker && (
                <Pressable onPress={toggleTimePicker}>
                  <TextInput
                    style={styles.input}
                    placeholder='Select time'
                    value={timeOfList}
                    onChangeText={setTimeOfList}
                    placeholderTextColor='#11182744'
                    editable={false}
                    onPressIn={toggleTimePicker}
                  />
                </Pressable>
              )}
            </View>
          </View>
          <View style={styles.itemContainerFull}>
            <View style={styles.item}>
              <Text style={styles.label}>Shops Visited</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter shops visited"
                value={shopsVisited}
                onValueChange={setShopsVisited}
              />
            </View>
          </View>
          <View style={styles.itemContainerHalf}>
            <View style={styles.item}>
              <Text style={styles.label}>Shops Sealed</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter shops sealed"
                value={shopsSealed}
                onValueChange={setShopsSealed}
              />
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>Compliances</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter compliances"
                value={compliances}
                onValueChange={setCompliances}
              />
            </View>

            <View style={styles.item}>
              <Text style={styles.label}>Arrests Made</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter arrests made"
                value={arrestsMade}
                onValueChange={setArrestsMade}
              />
            </View>
          </View>
          <View style={styles.itemContainerHalf}>
            <View style={styles.item}>
              <Text style={styles.label}>Violations</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter violations"
                value={violations}
                onValueChange={setViolations}
              />
            </View>
            
            <View style={styles.item}>
              <Text style={styles.label}>Warnings Issued</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter warnings issued"
                value={warningsIssued}
                onValueChange={setWarningsIssued}
              />
            </View>

            <View style={styles.item}>
              <Text style={styles.label}>FIRs Registered</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter FIRs registered"
                value={fIRsRegistered}
                onValueChange={setFIRsRegistered}
              />
            </View>
          </View>
          <View style={styles.itemContainerFull}>
          <View style={styles.item}>
              <Text style={styles.label}>Fines Issued</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter fines issued"
                value={finesIssued}
                onValueChange={setFinesIssued}
              />
            </View>
          </View>
          <View style={styles.itemContainerFull}>
            <View style={styles.attachmentContainer}>
              {/* <TouchableOpacity onPress={() => openModal('audio')}>
                <TabBarIcon name="mic-outline" color="#007AFF" />
              </TouchableOpacity> */}
              <TouchableOpacity onPress={() => handleAudioPick()}>
                <TabBarIcon name="mic-outline" color="#007AFF" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openModal('photo')}>
                <TabBarIcon name="camera-outline" color="#007AFF" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDocumentPick}>
                <TabBarIcon name="document-outline" color="#007AFF" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openModal('video')}>
                <TabBarIcon name="videocam-outline" color="#007AFF" />
              </TouchableOpacity>
              <MediaPickerModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                mediaType={mediaType}
                setModalVisible={setModalVisible}
                onSelect={getSelectFunction()}
              />
            </View>

            {attachments ? <>
              <FlatList
              data={attachments}
              renderItem={({ item, index }) => (
                <AttachmentPreview
                  item={item}
                  id={id}
                  onRemove={() => removeAttachment(index)}
                />
              )}
              keyExtractor={(item, index) => index}
            />
            </> : null}
          </View>
          <View style={[styles.itemContainerFull, {marginBottom: 20}]}>
            <Button title="Submit" onPress={()=>handleSubmit(id)} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
  },
  itemContainerFull: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    height: '100px'
  },
  itemContainerHalf: {
    paddingLeft: 20,
    paddingRight: 20,
    width: '50%',
    height: '100px'
  },
  itemContainer1by3: {
    paddingLeft: 20,
    paddingRight: 20,
    width: '33%', // 50% -> 2 columns | 33% -> 3 columns | 25% -> 4 columns
    height: '100px'
  },
  itemContainer1by4: {
    paddingLeft: 20,
    paddingRight: 20,
    width: '25%',
    height: '100px'
  },
  item: {
    padding: '8px',
    margin: '8px',
    backgroundColor: '#EEEEEE',
    height: "calc(100% - 8px)"
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  resolveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  resolveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  dropdown: {
    borderColor: '#ccc',
    marginBottom: 15,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  dropDownContainer: {
    borderColor: '#ccc',
  },
  attachmentContainer: {
    flexDirection: 'row',
    margin: 15,
    justifyContent: 'space-between',
  },
  attachmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  datePicker: {
    width: 120,
    marginTop: -10,
  },
  timePicker: {
    width: 120,
    marginTop: -10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#075985',
  },
  pickerButton: {
    paddingHorizontal: 20,
  },
  attachmentContainer: {
    flexDirection: 'row',
    margin: 15,
    justifyContent: 'space-between',
  },
  attachmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default PriceControlForm;
