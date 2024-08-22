import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { getInitials, getLoctaionTitle, getTypeTitle } from '../../../utils/Ui';
import { dateDisplay } from '../../../utils/formatDate';
import { fetchInspectionsFromPocketBase } from '../../../utils/priceControlUtils';
import { setInspections } from '../../../redux/priceControlSlice';
import { setCurrInspection }  from '../../../redux/priceControlSlice';


const Item = ({ location, shopsVisited, date, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
    <View style={styles.iconContainer}>
      <Text style={styles.iconText}>{getInitials("Shops Visited") || ""}</Text>
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.title}>{getLoctaionTitle(location)}</Text>
      <Text style={styles.shopsVisited}>Shops Visited: {shopsVisited}</Text>
      <Text style={styles.datetime}>
        {dateDisplay(date) || ""}
      </Text>
    </View>
  </TouchableOpacity>
);

const Inspections = () => {
  const dispatch = useDispatch();
  let inspections = useSelector(state => state?.priceControl?.allInspections);
  console.log(inspections);
  const sortedInspections = inspections ? inspections.slice().sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  }) : [];

  if (inspections && inspections.length === 0) {
    const fetchInspections = async () => {
      try {
        inspections = await fetchInspectionsFromPocketBase();
        dispatch(setInspections(inspections));
      } catch (error) {
        console.error("Failed to fetch inspections", error);
      }            
    };
    fetchInspections();
  }
  
  const router = useRouter();

  const handleInspectionPress = (inspection) => {
    router.push({
      pathname: '/forms/priceControl/readPage',
    });
    dispatch(setCurrInspection(inspection))
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      {sortedInspections ? <FlatList
        data={[...inspections]}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => (
          <Item
            location={item.location}
            shopsVisited={item.shops_visited}
            date={item.datetime}
            onPress={() => handleInspectionPress(item)}
          />
        )}
        contentContainerStyle={styles.listContent}
      /> : ""}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  listContent: {
    margin: 10,
    gap: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  iconText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  status: {
    fontSize: 14,
    color: '#666',
  },
  shopsVisited: {
    fontSize: 14,
    color: '#444',
  },
  datetime: {
    fontSize: 12,
    color: '#999',
  },
});

export default Inspections;
