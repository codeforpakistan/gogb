export async function base64ToBlob(base64, mimeType) {
    console.log(base64);
    const base64Data = base64.split(',')[1];
    let byteCharacters = atob(base64Data);
    let byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    let byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
}