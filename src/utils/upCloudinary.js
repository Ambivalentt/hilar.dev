import cloudinary from '../config/cloudinary.js';
import { Readable } from 'stream';


const uploadToCloudinary = (fileBuffer, folder = 'users') => {

  const results = new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url); // Te devuelve el enlace
      }
    );
    Readable.from(fileBuffer).pipe(stream);
  });
  return results
};

export default uploadToCloudinary;