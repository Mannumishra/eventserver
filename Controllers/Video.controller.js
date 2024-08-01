const videoModel = require('../Models/Video.model');
const { uploadVideo } = require('../Utils/Cloudnary');
const fs = require("fs")

exports.CreateVideo = async (req, res) => {
    try {
        console.log(req.file)
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Gallery image is required"
            });
        }
        else {
            const newVideo = new videoModel();
            const vediourl = await uploadVideo(req.file.path)
            newVideo.video = vediourl;
            await newVideo.save();
            res.status(200).json({
                success: true,
                message: "Video created successfully",
                data: newVideo
            });
            fs.unlinkSync(req.file.path)
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};

exports.getAllVideo = async (req, res) => {
    try {
        const allVideo = await videoModel.find();
        if (!allVideo) {
            return res.status(400).json({
                success: false,
                message: "No video found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Videos found successfully",
            data: allVideo
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

exports.deleteVideoById = async (req, res) => {
    try {
        const id = req.params.id;
        const video = await videoModel.findByIdAndDelete(id);
        if (!video) {
            return res.status(400).json({
                success: false,
                message: "Video not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Video deleted successfully",
            data: video
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};
