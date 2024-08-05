import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';

export const filePick = async ({ mode, onSuccess, onError }) => {
  let result;

  try {
    if (mode === 'camera') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Camera permission is required to take a photo.');
        return;
      }
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
      });
    } else if (mode === 'gallery') {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
      });
    } else {
      Alert.alert('Error', 'Invalid mode specified.');
      return;
    }

    if (result && !result.canceled && result.assets && result.assets.length > 0) {
      const { uri } = result.assets[0];

      if (!uri) {
        onError?.('Failed to get the image URI.');
        return;
      }

      try {
        const fileInfo = await FileSystem.getInfoAsync(uri);

        if (!fileInfo.exists) {
          onError?.('Failed to find the image locally.');
          return;
        }

        onSuccess?.({ type: 'image', uri: fileInfo.uri });
      } catch (error) {
        onError?.(`Failed to get file info: ${error.message}`);
      }
    } else {
      onError?.('No image selected or operation was canceled.');
    }
  } catch (error) {
    onError?.(`An unexpected error occurred: ${error.message}`);
  }
};


// const handlePhotoPick = async (mode) => {
//     let result;
  
//     try {
//       if (mode === 'camera') {
//         const { status } = await ImagePicker.requestCameraPermissionsAsync();
//         if (status !== 'granted') {
//           Alert.alert('Permission Required', 'Camera permission is required to take a photo.');
//           return;
//         }
//         result = await ImagePicker.launchCameraAsync({
//           mediaTypes: ImagePicker.MediaTypeOptions.Images,
//           allowsEditing: true, // Optional: enables image editing
//           aspect: [4, 3], // Optional: sets aspect ratio for image capture
//         });
//       } else if (mode === 'gallery') {
//         result = await ImagePicker.launchImageLibraryAsync({
//           mediaTypes: ImagePicker.MediaTypeOptions.Images,
//           allowsEditing: true, // Optional: enables image editing
//           aspect: [4, 3], // Optional: sets aspect ratio for image selection
//         });
//       } else {
//         Alert.alert('Error', 'Invalid mode specified.');
//         return;
//       }
  
//       console.log('ImagePicker result:', result);
  
//       if (result && !result.canceled && result.assets && result.assets.length > 0) {
//         const { uri } = result.assets[0]; // Access the first asset
  
//         // Check if uri is valid
//         if (!uri) {
//           Alert.alert('Error', 'Failed to get the image URI.');
//           return;
//         }
  
//         try {
//           const fileInfo = await FileSystem.getInfoAsync(uri);
  
//           // Check if file exists
//           if (!fileInfo.exists) {
//             Alert.alert('Error', 'Failed to find the image locally.');
//             return;
//           }
  
//           // Add the image to attachments
//           setAttachments((prevAttachments) => [...prevAttachments, { type: 'image', uri: fileInfo.uri }]);
//         } catch (error) {
//           Alert.alert('Error', `Failed to get file info: ${error.message}`);
//         }
//       } else {
//         Alert.alert('Error', 'No image selected or operation was canceled.');
//       }
//     } catch (error) {
//       Alert.alert('Error', `An unexpected error occurred: ${error.message}`);
//     }
//   };

//   const handleDocumentPick = async () => {
//     const result = await DocumentPicker.getDocumentAsync();
//     if (result.type === 'success') {
//       setAttachments([...attachments, { type: 'document', uri: result.uri }]);
//     }
//   };