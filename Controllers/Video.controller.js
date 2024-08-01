const videoModel = require('../Models/Video.model');


exports.CreateVideo = async (req, res) => {
    try {
        console.log(req.body)
        const newVideo = new videoModel(req.body);
        await newVideo.save();
        res.status(200).json({
            success: true,
            message: "Video created successfully",
            data: newVideo
        });
    } catch (error) {
        console.error(error);
        fs.unlinkSync(req.file.path);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

exports.getAllVideo = async (req, res) => {
    try {
        const allVideo = await videoModel.find();
        if (!allVideo.length) {
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
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

exports.getSingleVideo = async (req, res) => {
    try {
        const data = await videoModel.findOne({ _id: req.params._id });
        if (!data) {
            return res.status(400).json({
                success: false,
                message: "No video found"
            });
            
        }
        res.status(200).json({
            success: true,
            message: "Video found successfully",
            data: data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

exports.updateVideo = async (req, res) => {
    try {
        const data = await videoModel.findOne({ _id: req.params._id });
        if (!data) {
            return res.status(400).json({
                success: false,
                message: "No video found"
            });
        }
        else {
            data.video = req.body.video ?? data.video
            await data.save();
        }
        res.status(200).json({
            success: true,
            message: "Video updated successfully",
            data: data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

exports.deleteVideo = async (req, res) => {
    try {
        const data = await videoModel.findOne({ _id: req.params._id });
        if (!data) {
            return res.status(400).json({
                success: false,
                message: "Video not found"
            });
        }
        else {
            await data.deleteOne();
            res.status(200).json({
                success: true,
                message: "Video deleted successfully"
            });
        }
    } catch (error) {
        console.error("Internal Server Error", error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
