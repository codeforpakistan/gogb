import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
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
import LawTypesDropdown from './lawTypes';
import { handleActivitySubmission } from '@/utils/law&OrderUtils';
import useHeaderTitle from '@/hooks/useHeaderTitle';
import AttachmentPreview from '../../../components/attachmentPreview';
import { requestPermissions } from '../../../utils/helpers';

const LawForm = () => {
  useEffect(() => {
    const getPermissions = async () => {
      await requestPermissions();
    };

    getPermissions();
  }, []);

  useHeaderTitle('Law & Order');
  const dispatch = useDispatch();
  const { id, actStart } = useLocalSearchParams();
  const activities = useSelector((state) => state.law.allActivities);
  const offlineActivities = useSelector((state) => state.law.offlineActivities);
  const activity = activities?.find((act) => act.start === actStart) || {};
  const [modalVisible, setModalVisible] = useState(false);
  const [mediaType, setMediaType] = useState('');

  const [title, setTitle] = useState(activity?.title || '');
  const [type, setType] = useState(activity?.type || '');
  const [start, setStart] = useState(activity?.start || dbDate());
  const [end, setEnd] = useState(activity?.end || '');
  const [location, setLocation] = useState(activity?.location || '');
  const [description, setDescription] = useState(activity?.description || '');
  const [attachments, setAttachments] = useState(activity?.attachments || []);

  const handleSubmit = async (id) => {
    const newActivity = {
      start ,
      end ,
      title,
      type,
      location,
      description,
      attachments,
      status:'03wo39321evp5os',
    };
    if (id) {
      newActivity.id = id
      await handleActivitySubmission(dispatch, newActivity, offlineActivities);
    } else {
      await handleActivitySubmission(dispatch, newActivity, offlineActivities);
    }
    router.back();
  };

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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Activity Form</Text>
      </View>

      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter activity title"
      />

      <Text style={styles.label}>Type</Text>
      <LawTypesDropdown
        value={type}
        onValueChange={setType}
      />

      <Text style={styles.label}>Location</Text>
      <LocationDropdown
        value={location}
        onValueChange={setLocation}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter activity description"
        multiline
      />

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

      <Button title="Submit" onPress={()=>handleSubmit(id)} />
        </>: ""}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
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
});

export default LawForm;
