import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { getInitials, getTypeTitle } from '../../../utils/Ui';
import { dateDisplay } from '../../../utils/formatDate';
import { fetchActivitiesFromPocketBase } from '../../../utils/law&OrderUtils';
import { setActivities } from '../../../redux/lawSlice';
import {setCurrActivity}  from '../../../redux/lawSlice';


const Item = ({ title, status, tag, date, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
    <View style={styles.iconContainer}>
      <Text style={styles.iconText}>{getInitials(tag) || ""}</Text>
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.tag}>{getTypeTitle(tag)|| ""}</Text>
      <Text style={styles.tag}>
        {dateDisplay(date) || ""}
      </Text>
    </View>
    <View>
      <Text style={styles.status}>{status === 'oc1pvgu8gv29bp0' ? 'Resolved' :'Open'}</Text>
    </View>
  </TouchableOpacity>
);

const Activities = () => {
  const dispatch = useDispatch();
  let activities = useSelector(state => state?.law?.allActivities);
  const sortedActivities = activities ? activities.slice().sort((a, b) => {
    return new Date(b.start) - new Date(a.start);
  }) : [];
  // console.log(activities);

  if (activities && activities.length === 0) {
   const fetchActivities = async () => {
     try {
       activities = await fetchActivitiesFromPocketBase();
       dispatch(setActivities(activities));
     } catch (error) {
       console.error("Failed to fetch activities", error);
     }            
   };
   fetchActivities();
  }
 
  
  const router = useRouter();

  const handleActivityPress = (activity) => {
    router.push({
      pathname: '/forms/lawOrder/readPage',
    });
    dispatch(setCurrActivity(activity))
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      {sortedActivities ? <FlatList
        data={[...sortedActivities]}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => (
          <Item
            title={item.title}
            status={item.status}
            tag={item.type}
            date={item.start}
            onPress={() => handleActivityPress(item)}
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
  tag: {
    fontSize: 12,
    color: '#999',
  },
});

export default Activities;
