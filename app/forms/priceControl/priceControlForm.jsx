import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useLocalSearchParams, router } from 'expo-router';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import {dbDate } from '@/utils/formatDate';
import LocationDropdown from '@/components/locationDropdown';
import useHeaderTitle from '@/hooks/useHeaderTitle';
import DateTimePicker from '@react-native-community/datetimepicker';


const PriceControlForm = () => {
  useHeaderTitle('Price Control Form');
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
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Price Control Form</Text>
      </View>

      <Text style={styles.label}>Location</Text>
      <LocationDropdown
        value={location}
        onValueChange={setLocation}
      />

      <Text style={styles.label}>Date and Time</Text>
      <RNDateTimePicker display="spinner" />
      
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter activity description"
        multiline
      />
      <Button title="Submit" onPress={()=>handleSubmit(id)} />
    </View>
  )
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

export default PriceControlForm;
