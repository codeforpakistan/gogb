import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, FlatList, Alert, Pressable, Platform, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useLocalSearchParams, router } from 'expo-router';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import {dbDate } from '@/utils/formatDate';
import LocationDropdown from '@/components/locationDropdown';
import useHeaderTitle from '@/hooks/useHeaderTitle';
import DateTimePicker from '@react-native-community/datetimepicker';
import AttachmentPreview from '../../../components/attachmentPreview';


const PriceControlForm = () => {
  useHeaderTitle('Price Control Form');
  const dispatch = useDispatch();
  const { id } = useLocalSearchParams();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [dateOfList, setDateOfList] = useState('');
  const [timeOfList, setTimeOfList] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [shopsVisited, setShopsVisited] = useState('');
  const [shopsSealed, setShopsSealed] = useState('');
  const [violations, setViolations] = useState('');
  const [compliances, setCompliances] = useState('');
  const [warningsIssued, setWarningsIssued] = useState('');
  const [arrestsMade, setArrestsMade] = useState('');
  const [fIRsRegistered, setFIRsRegistered] = useState('');
  const [finesIssued, setFinesIssued] = useState('');
  const [location, setLocation] = useState('');
  const [attachments, setAttachments] = useState([]);
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
    setDateOfList(currentDate.toDateString());
    toggleDatePicker();
  }

  const confirmTimeOfList = () => {
    setTimeOfList(currentTime.toTimeString());
    toggleTimePicker();
  }

  const handleSubmit = async () => {
    router.back();
  };


  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>New Inspection</Text>
          </View>

          <View style={styles.itemContainerFull}>
            <View style={styles.item}>
              <Text style={styles.label}>Location</Text>
              <LocationDropdown
                value={location}
                onValueChange={setLocation}
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
          {/* Shops visited = Compliances + Violations */}
          {/* Violations = Arrests Made + Warnings + FIRs + shops sealed */}
          <View style={styles.itemContainerFull}>
            <View style={styles.item}>
              <Text style={styles.label}>Shops Visited</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter shops visited"
              />
            </View>
          </View>
          <View style={styles.itemContainerHalf}>
            <View style={styles.item}>
              <Text style={styles.label}>Shops Sealed</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter shops sealed"
              />
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>Compliances</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter compliances"
              />
            </View>

            <View style={styles.item}>
              <Text style={styles.label}>Arrests Made</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter arrests made"
              />
            </View>
          </View>
          <View style={styles.itemContainerHalf}>
            <View style={styles.item}>
              <Text style={styles.label}>Violations</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter violations"
              />
            </View>
            
            <View style={styles.item}>
              <Text style={styles.label}>Warnings Issued</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter warnings issued"
              />
            </View>

            <View style={styles.item}>
              <Text style={styles.label}>FIRs Registered</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter FIRs registered"
              />
            </View>
          </View>
          <View style={styles.itemContainerFull}>
          <View style={styles.item}>
              <Text style={styles.label}>Fines Issued</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter fines issued"
              />
            </View>
          </View>
          <View style={styles.itemContainerFull}>
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
  }
});

export default PriceControlForm;
