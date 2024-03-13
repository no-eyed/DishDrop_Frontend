import fs from 'fs/promises';

export async function convertPathToBase64(filePath) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = (error) => {
            reject(error);
        };
        reader.readAsDataURL(filePath);
    });
}

export async function imagePathToFile(imagePath) {
  try {
    // Ensure imagePath is a local path within your project
    imagePath = './public' + imagePath;
    const buffer = await fs.readFile(imagePath);
    const blob = new Blob([buffer]);
    const fileName = imagePath.substring(imagePath.lastIndexOf('/') + 1);
    const file = new File([blob], fileName, { type: 'image/jpeg' }); // Adjust mime type if needed
    return file;
  } catch (error) {
    console.error('Error converting image path to file:', error);
    throw error;
  }
}