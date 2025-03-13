export function urlToBlob(dataURL: string): Blob {
    // Separar la parte de los datos de la data URL
    const partes = dataURL.split(",");
    const tipoMIME = partes[0].match(/:(.*?);/)?.[1]; // Extraer el tipo MIME
    const datosBase64 = partes[1]; // Extraer los datos en base64
  
    // Convertir los datos base64 a un array de bytes
    const byteCharacters = atob(datosBase64);
    const byteArrays = [];
  
    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays.push(byteCharacters.charCodeAt(i));
    }
  
    const byteArray = new Uint8Array(byteArrays);
  
    // Crear el Blob
    return new Blob([byteArray], { type: tipoMIME });
  }