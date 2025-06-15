/**
 * onDownload function – triggers a client-side download for a given file object
 * by creating a temporary object URL and anchor element.
 * 
 * This utility enables users to download files (such as blobs or generated content)
 * directly in the browser without requiring a server round-trip.
 * 
 * @function
 * 
 * @param {File} file - A File object representing the file to be downloaded, including its content and name.
 * 
 * @returns {void} This function does not return a value. It initiates the file download in the browser.
 * 
 * @example
 * ```ts
 * const file = new File(["Hello, world!"], "greeting.txt", { type: "text/plain" });
 * onDownload(file);
 * // Triggers download of 'greeting.txt' containing "Hello, world!"
 * ```
 */
export const onDownload = (file: File) => {
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = file.name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};