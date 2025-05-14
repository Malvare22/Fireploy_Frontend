export function removeImageBuffer(img: string) {
  return `${img.replace(/\?t=.*/, "")}?t=${Date.now()}}`;
}
