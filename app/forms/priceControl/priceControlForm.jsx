import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, FlatList, Alert, Pressable, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useLocalSearchParams, router } from 'expo-router';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import {dbDate } from '@/utils/formatDate';
import LocationDropdown from '@/components/locationDropdown';
import useHeaderTitle from '@/hooks/useHeaderTitle';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";


const PriceControlForm = () => {
  useHeaderTitle('Price Control Form');
  const dispatch = useDispatch();
  const { id, actStart } = useLocalSearchParams();
  const activities = useSelector((state) => state.law.allActivities);
  const offlineActivities = useSelector((state) => state.law.offlineActivities);
  const activity = activities?.find((act) => act.start === actStart) || {};
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateOfList, setDateOfList] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [location, setLocation] = useState(activity?.location || '');
  const [description, setDescription] = useState(activity?.description || '');
  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
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

  const confirmDateOfList = () => {
    setDateOfList(currentDate.toDateString());
    toggleDatePicker();
  }

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

      <Text style={styles.label}>Date</Text>
      {showPicker && (
        <DateTimePicker
          value={date}
          mode={'date'}
          display='spinner'
          onChange={onChange}
          style={styles.datePicker}
        />
      )}
      {showPicker && Platform.OS === "ios" && (
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
      {!showPicker && (
        <Pressable onPress={toggleDatePicker}>
          <TextInput
            style={styles.input}
            placeholder='Select date and time'
            value={dateOfList}
            onChangeText={setDateOfList}
            placeholderTextColor='#11182744'
            editable={false}
            onPressIn={toggleDatePicker}
          />
        </Pressable>
      )}
      
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
  datePicker: {
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
  }
});

export default PriceControlForm;
