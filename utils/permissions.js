import {PermissionsAndroid, Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

async function requestFilePermissions() {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'File Access Permission',
          message: 'This app needs access to your files.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can access files');
      } else {
        console.log('File access permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  } else {
    const permission = await check(PERMISSIONS.IOS.MEDIA_LIBRARY);
    if (permission === RESULTS.DENIED || permission === RESULTS.LIMITED) {
      const requestResult = await request(PERMISSIONS.IOS.MEDIA_LIBRARY);
      if (requestResult !== RESULTS.GRANTED) {
        console.log('File access permission denied');
      }
    }
  }
}