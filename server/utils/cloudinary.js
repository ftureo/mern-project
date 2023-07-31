import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: "mern-project-fabi",
    api_key: "645983347527336",
    api_secret: "rB8QxbJFnk7SdIhtasqPIm7sCU8",
    
});

export const uploadImageToCloudinary = async (filePath) => {
    return await cloudinary.uploader.upload(filePath, {
        folder: "books"
    });
};
