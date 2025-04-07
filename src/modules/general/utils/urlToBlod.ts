/**
 * Converts a base64 data URL into a Blob object.
 *
 * This is commonly used to transform image or file previews (in data URL format)
 * into binary objects suitable for uploads or processing.
 *
 * @async
 * @function urlToBlob
 * @param {string} dataURL - The data URL string containing base64-encoded data.
 * @returns {Promise<Blob>} A promise that resolves to a Blob object representing the data.
 */
export async function urlToBlob(dataURL: string) {
  // Separate the metadata and the actual base64 data
  const partes = dataURL.split(",");
  const tipoMIME = partes[0].match(/:(.*?);/)?.[1]; // Extract MIME type
  const datosBase64 = partes[1]; // Extract base64 data

  // Decode base64 to binary string
  const byteCharacters = atob(datosBase64);
  const byteArrays = [];

  for (let i = 0; i < byteCharacters.length; i++) {
    byteArrays.push(byteCharacters.charCodeAt(i));
  }

  const byteArray = new Uint8Array(byteArrays);

  // Create and return the Blob
  return new Blob([byteArray], { type: tipoMIME });
}
