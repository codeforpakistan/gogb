export const base64ToFile = (base64Data, fileName, mimeType) => {
    return new Promise((resolve, reject) => {
      try {
        const byteString = atob(base64Data);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
          uint8Array[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([arrayBuffer], { type: mimeType });
        const file = new File([blob], fileName, { type: mimeType });
        resolve(file);
      } catch (error) {
        reject(new Error('Error converting base64 to file: ' + error.message));
      }
    });
  };
  
