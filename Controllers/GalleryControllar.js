const galley = require("../Models/GallerModel")
const fs = require("fs");
const { uploadImage, deleteImageFromCloudinary } = require("../Utils/Cloudnary");

const createGallery = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Gallery image is required"
            });
        }
        else {
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

const getSingleGallery = async (req, res) => {
    try {
        const data = await galley.findOne({ _id: req.params._id });
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

const updateGallery = async (req, res) => {
    try {
        const data = await galley.findOne({ _id: req.params._id });
        if (!data || data.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Gallery not found"
            });
        }
        else {
            if (req.file) {
                if (data.gallery) {
                    const oldImage = data.gallery.split("/").pop().split(".")[0]
                    try {
                        await deleteImageFromCloudinary(oldImage)
                    } catch (error) { }
                }
                const imgurl = await uploadImage(req.file.path);
                data.gallery = imgurl;
            }
            await data.save()
            fs.unlinkSync(req.file.path)
            res.status(200).json({
                success: true,
                message: "Gallery Updated successfully",
                data: data
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const deleteGallery = async (req, res) => {
    try {
        const data = await galley.findOne({ _id: req.params._id });
        if (!data || data.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Gallery not found"
            });
        }
        else {
            if (data.gallery) {
                const oldImage = data.gallery.split("/").pop().split(".")[0]
                try {
                    await deleteImageFromCloudinary(oldImage)
                } catch (error) { }
            }
            await data.deleteOne()
            res.status(200).json({
                success: true,
                message: "Gallery Delete successfully",
                data: data
            });
        }
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
    getGallery,
    getSingleGallery,
    updateGallery,
    deleteGallery
};
