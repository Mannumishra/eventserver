const { uploadImage, deleteImageFromCloudinary } = require("../Utils/Cloudnary");
const Artist = require("../Models/Artist.Model")
const fs = require("fs")

exports.CreateArtist = async (req, res) => {
    try {
        const { name } = req.body;
        console.log(req.body);
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all fields."
            });
        }

        let newArtist = new Artist({ name });
        if (req.file) {
            const imgUrl = await uploadImage(req.file.path);
            newArtist.image = imgUrl;
            try {
                fs.unlinkSync(req.file.path)
            } catch (error) { }
        } else {
            return res.status(400).json({
                success: false,
                message: "Image is required."
            });
        }

        await newArtist.save();
        res.status(200).json({
            success: true,
            message: "Artist created successfully",
            data: newArtist
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error creating artist"
        });
    }
};


exports.getArtist = async (req, res) => {
    try {
        const data = await Artist.find()
        if (!data) {
            return res.status(404).json({
                success: false,
                mess: "Artist Not Found"
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "Artists found successfully",
                data: data
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

exports.getSingleArtist = async (req, res) => {
    try {
        const data = await Artist.findOne({ _id: req.params._id })
        if (!data) {
            return res.status(404).json({
                success: false,
                mess: "Artist Not Found"
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "Artists found successfully",
                data: data
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

exports.deleteArtist = async (req, res) => {
    try {
        const data = await Artist.findOne({ _id: req.params._id })
        if (!data) {
            return res.status(404).json({
                success: false,
                mess: "Artist Not Found"
            })
        }
        else {
            if (data.image) {
                const oldImage = data.image.split("/").pop().split(".")[0]
                try {
                    await deleteImageFromCloudinary(oldImage)
                } catch (error) { }
            }
            await data.deleteOne()
            res.status(200).json({
                success: true,
                message: "Artists Delete Successfully",
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

exports.updateArtist = async (req, res) => {
    try {
        const data = await Artist.findOne({ _id: req.params._id })
        if (!data) {
            return res.status(404).json({
                success: false,
                mess: "Artist Not Found"
            })
        }
        else {
            data.name = req.body.name ?? data.name
            if (req.file) {
                const oldImage = data.image.split("/").pop().split(".")[0]
                try {
                    await deleteImageFromCloudinary(oldImage)
                } catch (error) { }
                const imgUrl = await uploadImage(req.file.path);
                data.image = imgUrl;
                try {
                    fs.unlinkSync(req.file.path)
                } catch (error) { }
            }
            await data.save()
            res.status(200).json({
                success: true,
                message: "Artists Update successfully",
                data: data
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal server error"
        });
    }
}