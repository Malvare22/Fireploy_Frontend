export function fileToString(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result as string);
    };

    reader.onerror = () => {
      reject(reader.error);
    };

    reader.readAsText(file);
  });
}

export function stringToFile(content: string, fileName: string, type = "text/plain"): File {
  return new File([content], fileName, { type });
}
