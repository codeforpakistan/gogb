import * as FileSystem from 'expo-file-system';
import mime from 'mime';

// Convert URI to Base64 (bypassing the need for Blob)
export const uriToBase64 = async (uri) => {
    try {
        const base64Data = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
        const mimeType = mime.getType(uri);  // Get correct MIME type for the file
        return `data:${mimeType};base64,${base64Data}`;  // Return base64 string with MIME type
    } catch (error) {
        console.error("Error converting URI to Base64:", error);
        throw error;
    }
};

export const requestPermissions = async () => {
    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.CAMERA,
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
            ]);
            if (
                granted['android.permission.CAMERA'] !== PermissionsAndroid.RESULTS.GRANTED ||
                granted['android.permission.RECORD_AUDIO'] !== PermissionsAndroid.RESULTS.GRANTED ||
                granted['android.permission.READ_EXTERNAL_STORAGE'] !== PermissionsAndroid.RESULTS.GRANTED ||
                granted['android.permission.WRITE_EXTERNAL_STORAGE'] !== PermissionsAndroid.RESULTS.GRANTED
            ) {
                console.warn('Some permissions were not granted.');
            } else {
                console.log('All permissions granted.');
            }
        } catch (err) {
            console.warn(err);
        }
    }
};
