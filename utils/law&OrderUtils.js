import NetInfo from '@react-native-community/netinfo';
import pb from '../pocketbaseClient';
import { Alert } from 'react-native';
import { addActivity, updateActivity, setOfflineActivity, clearOfflineActivities, setActivities } from '../redux/lawSlice';

export const submitActivityToPocketBase = async (activity) => {
  try {
    // const formData = new FormData();

    // // Append other activity data
    // for (const key in activity) {
    //   if (key !== 'attachments') {
    //     formData.append(key, activity[key]);
    //   }
    // }

    // // Append attachments if they exist
    // if (activity.attachments) {
    //   activity.attachments.forEach((attachment, index) => {
    //     formData.append('attachments', {
    //       name: attachment.fileName,
    //       type: attachment.type,
    //       uri: activity,
    //     })
    //   });
    // }

    if (activity.id !== null) {
      await pb.collection('gogb_law_incidents').update(activity.id, activity);
    } else {
      const response = await pb.collection('gogb_law_incidents').create(activity);
      activity.id = response.id;
    }
  } catch (error) {
    throw new Error('Error submitting activity to PocketBase: ' + error.message);
  }
};


export const fetchActivitiesFromPocketBase = async () => {
  try {
    const activities = await pb.collection('gogb_law_incidents').getFullList();
    return activities;
  } catch (error) {
    throw new Error('Error fetching activities from PocketBase: ' + error.message);
  }
};

export const handleActivitySubmission = async (dispatch, newActivity, offlineActivities) => {
  const netInfo = await NetInfo.fetch();

  if (netInfo.isConnected) {
    try {
      await submitActivityToPocketBase(newActivity);

      if (offlineActivities.length > 0) {
        for (const offlineActivity of offlineActivities) {
          await submitActivityToPocketBase(offlineActivity);
        }
        dispatch(clearOfflineActivities());
      }
      const activities =  await fetchActivitiesFromPocketBase();
      dispatch(setActivities(activities))
    } catch (error) {
      dispatch(setOfflineActivity(newActivity));
      const activities =  await fetchActivitiesFromPocketBase();
      dispatch(setActivities(activities))
      Alert.alert('Error', error.message);
    }
  } else {
    dispatch(setOfflineActivity(newActivity));
  }
};
