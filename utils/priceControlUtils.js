import NetInfo from '@react-native-community/netinfo';
import pb from '../pocketbaseClient';
import { Alert } from 'react-native';
import { addInspection, updateInspection, setOfflineInspection, clearOfflineInspections, setInspections, setCurrInspection } from '../redux/priceControlSlice';

export const submitInspectionToPocketBase = async (inspection) => {
  try {
    const formData = new FormData();
    for (const key in inspection) {
      if (key !== 'attachments') {
        switch(key) {
          case 'datetime':
            formData.append('datetime', inspection[key]);
            break;
          case 'shopsVisited':
            formData.append('shops_visited', inspection[key]);
            break;
          case 'shopsSealed':
            formData.append('shops_sealed', inspection[key]);
            break;
          case 'violations':
            formData.append('violations', inspection[key]);
            break;
          case 'compliances':
            formData.append('compliances', inspection[key]);
            break;
          case 'warningsIssued':
            formData.append('warnings_issued', inspection[key]);
            break;
          case 'arrestsMade':
            formData.append('arrests_made', inspection[key]);
            break;
          case 'fIRsRegistered':
            formData.append('firs_registered', inspection[key]);
            break;
          case 'finesIssued':
            formData.append('fines_issued', inspection[key]);
            break;
          default:
            formData.append(key, inspection[key]);
        }
      }
    }
    // Append attachments if they exist
    if (inspection.attachments) {
      inspection.attachments.forEach(async (attachment, index) => {
        if (attachment.uri) {
          const file = { uri: attachment.uri, type: attachment.type, name:attachment.name };
          formData.append(`attachments`, file);
        }
      });
    }
    if (inspection.id) {
      await pb.collection('gogb_price_control').update(inspection.id, formData);
    } else {
      await pb.collection('gogb_price_control').create(formData);
    }
  } catch (error) {
    throw new Error('Error submitting inspection to PocketBase: ' + error.message);
  }
};


export const fetchInspectionsFromPocketBase = async () => {
  try {
    const inspections = await pb.collection('gogb_price_control').getFullList({sort:'-created'});
    return inspections;
  } catch (error) {
    console.log('Error fetching inspections from PocketBase: ' + error.message);
  }
};

export const handleInspectionSubmission = async (dispatch, newInspection, offlineInspections, auth) => {
  const netInfo = await NetInfo.fetch();

  if (netInfo.isConnected) {
    try {
      await submitInspectionToPocketBase(newInspection);
      try {
        if (offlineInspections.length > 0) {
          try {
            for (const offlineInspection of offlineInspections) {
              await submitInspectionToPocketBase(offlineInspection);
            }
            dispatch(clearOfflineInspections());
          } catch (error) {
            console.log(error)
          }
        }
      } catch (error) {
        console.log(error);
      }
      const inspections =  await fetchInspectionsFromPocketBase();
      dispatch(setInspections(inspections))
    } catch (error) {
      dispatch(setOfflineInspection(newInspection));
      const inspections =  await fetchInspectionsFromPocketBase();
      dispatch(setInspections(inspections))
      Alert.alert('Error', error.message);
    }
  } else {
    dispatch(setOfflineInspection(newInspection));
  }
  dispatch(setCurrInspection(newInspection))
};
