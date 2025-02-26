// src/utils/image-util.js
const images = import.meta.glob('../assets/icons/*', { eager: true });

export const getImageUrl = (imageName) => {
  const imagePath = `../assets/icons/${imageName}`;
  const imageModule = images[imagePath];
  if (imageModule) {
    return imageModule.default;
  } else {
    console.error(`Image "${imageName}" not found.`);
    return "";
  }
};
