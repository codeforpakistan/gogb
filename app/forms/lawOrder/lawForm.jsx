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

const imgDir = FileSystem.documentDirectory + 'images/';
const ensureDirExits = async()=> {
  const dirInfo = await FileSystem.getInfoAsync(imgDir);
  if(!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imgDir, {intermediates:true});
  }
};

const LawForm = () => {
  useHeaderTitle();
  const dispatch = useDispatch();
  const { id, start } = useLocalSearchParams();
  const activities = useSelector((state) => state.law.allActivities);
  const offlineActivities = useSelector((state) => state.law.offlineActivities);
  const activity = activities?.find((act) => act.start === start) || {};
  const [modalVisible, setModalVisible] = useState(false);
  const [mediaType, setMediaType] = useState('');

  const [title, setTitle] = useState(activity?.title || '');
  const [type, setType] = useState(activity?.type || '');
  const [location, setLocation] = useState(activity?.location || '');
  const [description, setDescription] = useState(activity?.description || '');
  const [attachments, setAttachments] = useState(activity?.attachments || []);

  const handleSubmit = async (id) => {
    const newActivity = {
      id: id ? id :null,
      start: dbDate(),
      end: null,
      title,
      type,
      location,
      description,
      attachments,
      status: activity.status || '03wo39321evp5os',
    };
    const success = await handleActivitySubmission(dispatch, newActivity, offlineActivities);
    if (success) {
      router.back();
    }
  };

  const openModal = (type) => {
    setMediaType(type);
    setModalVisible(true);
  };

  const saveImage = async (uri) => {
    await ensureDirExits();
    const fileName = dbDate() + '.jpg';
    const dest = imgDir + fileName;
    await FileSystem.copyAsync({from:uri, to:dest})
    setAttachments([...attachments, dest])
  }
  
  // Existing image picker function
  const handlePhotoPick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false, 
      allowsEditing:false,
    });
    if (!result.canceled) {
      setAttachments([...attachments, { type: 'image', uri: result.assets[0].uri, name:result.assets[0].name }]);
    }
  };
  
  // New video picker function
  const handleVideoPick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsMultipleSelection: false, // Not supported by ImagePicker
    });
    if (!result.canceled) {
      setAttachments([...attachments, { type: 'video', uri: result.assets[0].uri, name:result.assets[0].name }]);
    }
  };
  
  // New document picker function
  const handleDocumentPick = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: '/',
      multiple: false, // DocumentPicker supports multiple file selection
    });
    if (!result.canceled) {
      setAttachments([...attachments, { type: 'document', uri: result.assets[0].uri, name:result.assets[0].name }]);
    }
  };  

  const handleAudioPick = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'audio/*',
      multiple: true,
    });
    if (!result.canceled) {
      setAttachments([...attachments, { type: 'audio', uri: result.assets[0].uri, name:result.assets[0].name }]);
    }
  };

  // const getSelectFunction = () => {
  //   switch (mediaType) {
  //     case 'photo':
  //       return handlePhotoPick;
  //     case 'audio':
  //       return handleAudioRecord;
  //     case 'document':
  //       return handleDocumentPick;
  //     case 'video':
  //       return handleVideoRecord;
  //     default:
  //       return () => {};
  //   }
  // };

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
        <TouchableOpacity onPress={handleAudioPick}>
          <TabBarIcon name="mic-outline" color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePhotoPick}>
          <TabBarIcon name="camera-outline" color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDocumentPick}>
          <TabBarIcon name="document-outline" color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleVideoPick}>
          <TabBarIcon name="videocam-outline" color="#007AFF" />
        </TouchableOpacity>
        {/* <MediaPickerModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          mediaType={mediaType}
          setModalVisible={setModalVisible}
          onSelect={getSelectFunction()}
        /> */}
      </View>

      <FlatList
        data={attachments}
        renderItem={({ item, index }) => (
          <AttachmentPreview
            item={item}
            onRemove={() => removeAttachment(index)}
          />
        )}
        keyExtractor={(item, index) => index}
      />

      <Button title="Submit" onPress={()=>handleSubmit(id)} />
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
