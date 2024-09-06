import NetInfo from '@react-native-community/netinfo';
import pb from '../pocketbaseClient';
import { Alert } from 'react-native';
import { uriToBlob } from './helpers'; // Adjust the path as necessary
import { addActivity, updateActivity, setOfflineActivity, clearOfflineActivities, setOfflineActivities, setActivities, setCurrActivity } from '../redux/lawSlice';

export const submitActivityToPocketBase = async (activity) => {
  try {
    const formData = new FormData();
    // Append other activity data
    for (const key in activity) {
      if (key !== 'attachments') {
        formData.append(key, activity[key]);
      }
    }
    // Append attachments if they exist
    if (activity.attachments) {
      for (let i = 0; i < activity.attachments.length; i++) {
        const attachment = activity.attachments[i];
        if (attachment.uri) {
          formData.append('attachments', {
            uri: attachment.uri,
            type: attachment.type || 'application/octet-stream',
            name: attachment.name || `attachment-${i}`,
          });
          console.log('Appended to FormData:', attachment.name, attachment.type, attachment.uri);
        }
      }
    }

    console.log('Final FormData:', formData);
    if (activity.id) {
      const response = await pb.collection('gogb_law_incidents').update(activity.id, formData);
      console.log('Server response:', response);
    } else {
      const response = await pb.collection('gogb_law_incidents').create(formData);
      console.log('Server response:', response);
    }
  } catch (error) {
    throw new Error('Error submitting activity to PocketBase: ' + error.message);
  }
};


export const fetchActivitiesFromPocketBase = async () => {
  try {
    const activities = await pb.collection('gogb_law_incidents').getFullList({sort:'-start'});
    return activities;
  } catch (error) {
    console.log('Error fetching activities from PocketBase: ' + error.message);
  }
};

export const deleteActivity = async (dispatch, collectionName, activity, offlineActivities) => {
  try {
    if (activity.id) {
      await pb.collection(collectionName).delete(activity.id);
      const activities =  await fetchActivitiesFromPocketBase();
      dispatch(setActivities(activities))
    } else {
      const updatedOfflineActivities = offlineActivities.filter(
        offlineActivity => offlineActivity.start === activity.start
      );
      dispatch(setOfflineActivities(updatedOfflineActivities));
    }
  } catch (error) {
    console.error('Error deleting activity:', error);
  }
};

export const handleActivitySubmission = async (dispatch, newActivity, offlineActivities, auth) => {
  const netInfo = await NetInfo.fetch();

  if (netInfo.isConnected) {
    try {
      await submitActivityToPocketBase(newActivity);
      try {
        if (offlineActivities.length > 0) {
          try {
            for (const offlineActivity of offlineActivities) {
              await submitActivityToPocketBase(offlineActivity);
            }
            dispatch(clearOfflineActivities());
          } catch (error) {
            console.log(error)
          }
        }
      } catch (error) {
        console.log(error);
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
  dispatch(setCurrActivity(newActivity))
};
