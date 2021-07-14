export const loadImage = (link) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = link;
    img.onload = () => resolve(img);
    img.onerror = () => reject("Failed to load image");
  })
}
