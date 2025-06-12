
export function removeImageBuffer(img: string) {/**
 * removeImageBuffer function – updates an image URL by appending a timestamp-based query parameter
 * to bypass browser caching, unless the URL is from a specific trusted domain.
 * 
 * This function helps ensure that image updates are reflected immediately by forcing the browser
 * to treat the URL as a new resource, unless the image is hosted on `googleusercontent.com`,
 * in which case the URL is returned unchanged.
 * 
 * @function
 * 
 * @param {string} img - The URL of the image to process.
 * 
 * @returns {string} A modified URL with a timestamp query parameter to prevent caching,
 * or the original URL if it matches an excluded domain.
 * 
 * @example
 * ```ts
 * const updatedUrl = removeImageBuffer("https://example.com/image.png?t=123");
 * // Returns: "https://example.com/image.png?t=1675349123456"
 * ```
 */
  if (img.includes("googleusercontent.com")) {
    return img;
  }
  return `${img.replace(/\?t=.*/, "")}?t=${Date.now()}`;
}
