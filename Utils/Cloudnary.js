const cloudinary = require('cloudinary').v2;

cloudinary.config({
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    cloud_name: process.env.CLOUD_NAME,
});

const uploadImage = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file, {
            folder: "artists"
        });
        return result.secure_url;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to upload video');
    }
};

const uploadVideo = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file, {
            folder: "artists",
            resource_type: "video" 
        });
        return result.secure_url;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to upload video');
    }
};

const deleteImageFromCloudinary = async (file) => {
    try {
        await cloudinary.uploader.destroy(file);
        console.log("Video Deleted");
    } catch (error) {
        console.error("Error deleting video from Cloudinary", error);
        throw new Error('Failed to delete video from Cloudinary');
    }
};

module.exports = {
    uploadImage, uploadVideo, deleteImageFromCloudinary
};
