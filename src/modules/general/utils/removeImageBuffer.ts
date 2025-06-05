export function removeImageBuffer(img: string) {
  if (img.includes("googleusercontent.com")) {
    return img;
  }
  return `${img.replace(/\?t=.*/, "")}?t=${Date.now()}`;
}
