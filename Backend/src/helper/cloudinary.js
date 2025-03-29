import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv'

dotenv.config()

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


export const uploadOnCloudinary = async (localFilePath) => {
    try {

        if (!localFilePath) {
            return null
        }

        //upload file on cloudinay
        const result = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            access_mode: "public",
        })

        //file uploaded seccessfully
        console.log("file upload on cloudinary")

        return result;

    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        return null
    }
}

