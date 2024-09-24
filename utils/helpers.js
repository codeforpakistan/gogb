import * as FileSystem from 'expo-file-system';
import mime from 'mime';

/**
 * Convert a URI to a base64 string.
 * @param {string} uri - The URI to convert.
 * @returns {Promise<string>} - The base64 string.
 */
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

/**
 * Request the permissions required for the app to function.
 * @returns {Promise<void>}
 */
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

/**
 * Splits a datetime string or Date object into separate date and time strings.
 *
 * @param {string | Date} datetime - The datetime to split.
 * @returns {{ date: string, time: string }} - An object containing separate date and time.
 */
export const splitDateTime = (datetime) => {
    let dateObj;
    
    if (datetime instanceof Date) {
        dateObj = datetime;
    } else {
        dateObj = new Date(datetime);
        if (isNaN(dateObj)) {
            throw new Error('Invalid datetime format');
        }
    }

    const date = dateObj.toDateString(); // e.g., "Wed Sep 18 2024"
    const time = dateObj.toTimeString(); // e.g., "11:20:00 GMT+0500"

    return { date, time };
};