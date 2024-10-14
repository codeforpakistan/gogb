import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import pb from '../pocketbaseClient'; 
import { clearOfflineActivities } from '../redux/lawSlice'; 

const useNetworkMonitor = () => {
  const offlineActivities = useSelector((state) => state?.law?.offlineActivities);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(async (state) => {
      if (state.isConnected && offlineActivities?.length > 0) {
        for (const offlineActivity of offlineActivities) {
          try {
            await pb.collection('gogb_law_incidents').create(offlineActivity);
          } catch (error) {
            console.error('Error submitting offline activity to PocketBase:', error);
          }
        }
        dispatch(clearOfflineActivities());
        console.log('Offline activities submitted to PocketBase');
      }
    });

    return () => unsubscribe();
  }, [offlineActivities, dispatch]);
};

export default useNetworkMonitor;



// const collectionName = 'gogb_law_incidents';
// const keywordToDelete = 'offline';

// async function deleteRecordsContainingKeyword(keyword) {
//     let page = 1;
//     const perPage = 50;

//     try {
//         while (true) {
//             // Fetch the records with titles containing the keyword
//             const records = await pb.collection(collectionName).getList(page, perPage, {
//                 filter: `title ~ "${keyword}"`
//             });

//             // If no records are returned, stop the loop
//             if (records.items.length === 0) {
//                 break;
//             }

//             // Delete each record
//             for (const record of records.items) {
//                 await pb.collection(collectionName).delete(record.id);
//                 console.log(`Deleted record with ID: ${record.id}`);
//             }

//             // Increment the page to fetch the next set of records
//             page++;
//         }

//         console.log('All matching records have been deleted.');
//     } catch (error) {
//         console.error('Error deleting records:', error);
//     }
// }

// // Call the function with the desired keyword
// deleteRecordsContainingKeyword(keywordToDelete);