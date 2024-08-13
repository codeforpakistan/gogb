import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { useLocalSearchParams, router } from 'expo-router';
// import { TabBarIcon } from '@/components/navigation/TabBarIcon';
// import {dbDate } from '@/utils/formatDate';
import useHeaderTitle from '@/hooks/useHeaderTitle';


const PriceControlForm = () => {
  useHeaderTitle('Price Control');
  return (
    <View>
      <Text>price control form</Text>
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
