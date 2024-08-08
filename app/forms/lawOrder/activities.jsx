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
  const activities = useSelector(state => state?.law?.allActivities);
  const [sortedActivities, setSortedActivities] = useState([]);

  useEffect(() => {
    const sorted = [...activities].sort((a, b) => new Date(b.start) - new Date(a.start));
    setSortedActivities(sorted);
  }, [activities]);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   const fetchActivities = async () => {
  //     try {
  //       const activities = await fetchActivitiesFromPocketBase();
  //       dispatch(setActivities(activities));
  //     } catch (error) {
  //       console.error("Failed to fetch activities", error);
  //     }            
  //   };
  //   fetchActivities();
  // }, [dispatch]);
  
  const router = useRouter();

  const handleActivityPress = (activity) => {
    router.push({
      pathname: '/forms/lawOrder/readPage',
      params: { start:activity?.start},
    });
    dispatch(setCurrActivity(activity))
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      {activities ? <FlatList
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
