import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getLoctaionTitle, getTypeTitle } from '../../../utils/Ui';
import { dateDisplay, dbDate } from '../../../utils/formatDate';
import { useLocalSearchParams, useRouter } from 'expo-router';
import useHeaderTitle from '@/hooks/useHeaderTitle';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { handleActivitySubmission } from '../../../utils/law&OrderUtils';

const ReadPage = () => {
  // Ensure hooks are always called at the top level
  useHeaderTitle('Activity Details');
  const router = useRouter();
  const { start } = useLocalSearchParams();
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.law.allActivities);
  const offlineActivities = useSelector((state) => state.law.offlineActivities);
  const activity = useSelector((state) => state.law.currActivity);
  console.log(activity);

  // Function handlers should be defined outside of the render logic
  const handleEdit = (activity) => {
    router.push({
      pathname: '/forms/lawOrder/lawForm',
      params: {id: activity.id, start: activity.start },
    });
  };

  const handleResolve = (activity) => {
    console.log('Resolve button pressed');
    Alert.alert(
      'Resolve Activity',
      'Are you sure you want to mark this activity as resolved?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            const newActivity = { ...activity, end: dbDate(), status: 'oc1pvgu8gv29bp0' };
            handleActivitySubmission(dispatch, newActivity, offlineActivities);
          },
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Activity Details</Text>
      </View>
      {activity ? <>
        <View style={styles.detailContainer}>
        <Text style={styles.detailText}>Title: {activity.title}</Text>
        <Text style={styles.detailText}>Type: {getTypeTitle(activity.type) || ""}</Text>
        <Text style={styles.detailText}>Location: {getLoctaionTitle(activity.location) || ""}</Text>
        <Text style={styles.detailText}>Description: {activity.description}</Text>
        <Text style={styles.detailText}>
          Status: {activity.status === 'oc1pvgu8gv29bp0' ? 'Resolved' : 'Open'}
        </Text>
        {activity.status === 'oc1pvgu8gv29bp0' && (
          <Text style={styles.detailText}>
            Resolved: {dateDisplay(activity.end) || ""} 
          </Text>
        )}
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={()=>handleEdit(activity)} style={styles.iconButton}>
          <Ionicons name="pencil" size={24} color="#007AFF" />
          <Text>Edit</Text>
        </TouchableOpacity>
        {activity.status !== 'oc1pvgu8gv29bp0' && (
          <TouchableOpacity onPress={() => handleResolve(activity)} style={styles.iconButton}>
            <Ionicons name="checkmark-circle" size={24} color="green" />
            <Text>Resolve</Text>
          </TouchableOpacity>
        )}
      </View>
      </> : ""}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  detailContainer: {
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconButton: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
});

export default ReadPage;
