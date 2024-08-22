import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getLoctaionTitle, getTypeTitle } from '../../../utils/Ui';
import { dateDisplay, dbDate } from '../../../utils/formatDate';
import { useLocalSearchParams, useRouter, router } from 'expo-router';
import useHeaderTitle from '@/hooks/useHeaderTitle';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { deleteActivity, handleActivitySubmission } from '../../../utils/law&OrderUtils';
import AttachmentPreview from '../../../components/attachmentPreview';

const ReadPage = () => {
  // Ensure hooks are always called at the top level
  useHeaderTitle('Activity Details');
  const router = useRouter();
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.law.allActivities);
  const offlineActivities = useSelector((state) => state.law.offlineActivities);
  const activity = useSelector((state) => state.law.currActivity);
  console.log(activity);

  // Function handlers should be defined outside of the render logic
  const handleEdit = (activity) => {
    router.push({
      pathname: '/forms/lawOrder/lawForm',
      params: {id: activity.id, actStart: activity.start },
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

  const handleDelete = (activity) => {
    console.log('Delete button pressed');
    Alert.alert(
      'Resolve Activity',
      'Are you sure you want to Delete this activity permanently?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: async () => {
            await deleteActivity(dispatch, 'gogb_law_incidents', activity, offlineActivities)
          },
        },
      ]
    );
    router.back();
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
        <Text style={styles.detailText}>Created: {dateDisplay(activity.start) || ""}  </Text>
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
      <TouchableOpacity onPress={()=>handleEdit(activity)} style={{ 
         ...styles.button, 
            backgroundColor:  '#1DA1F2'
       }}>
          <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>handleDelete(activity)} style={{ 
         ...styles.button, 
            backgroundColor:  '#F44336'
       }}>
          <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
        {activity.status !== 'oc1pvgu8gv29bp0' && (
          <TouchableOpacity onPress={()=>handleResolve(activity)} style={{ 
            ...styles.button, 
            backgroundColor: "#4CAF50" 
          }}>
             <Text style={styles.buttonText}>Resolve</Text>
          </TouchableOpacity>
        )}
      </View>
      </> : ""}
      {activity.attachments ? <>
        <FlatList
        data={activity.attachments}
        renderItem={({ item, index }) => (
          <AttachmentPreview
            item={item}
            id={activity.id}
            page='details'
          />
        )}
        keyExtractor={(item, index) => index}
      />
        </>: ""}
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
    gap:10,
    marginBottom:20
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:3,
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ReadPage;
