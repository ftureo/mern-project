import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config()

// TODO: ADD CONFIG IN .ENV
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImageToCloudinary = async (filePath) => {
    return await cloudinary.uploader.upload(filePath, {
        folder: "books"
    });
};

export const deleteImageFromCloudinary = async (publicId) => {
    return await cloudinary.uploader.destroy(publicId);
}
