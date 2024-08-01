const galley = require("../Models/GallerModel")
const fs = require("fs");
const { uploadImage } = require("../Utils/Cloudnary");

const createGallery = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Gallery image is required"
            });
        }
       else{
        const data = new galley();
        const imgurl = await uploadImage(req.file.path);
        console.log(imgurl)
        data.gallery = imgurl;
        await data.save();
        res.status(200).json({
            success: true,
            message: "New image added to gallery successfully",
            data: data
        });
        fs.unlinkSync(req.file.path);
       }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const getGallery = async (req, res) => {
    try {
        const data = await galley.find();
        if (!data || data.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Gallery not found"
            });
        }
        
        res.status(200).json({
            success: true,
            message: "Gallery found",
            data: data
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = {
    createGallery,
    getGallery
};
