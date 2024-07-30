const Artist = require('../Models/Artist.Model')
const path = require('path')
const fs = require('fs')


exports.CreateArtist = async (req, res) => {
    try {
        const { name } = req.body;
        console.log(req.body)
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all fields."
            })
        }
        const newArtist = new Artist({ name })
        console.log(req.file)
        if (req.file) {
            const image = req.file.path
            newArtist.image =image
        }
        await newArtist.save();

        res.status(400).json({
            success: true,
            message: "Artist created successfully",
            data: newArtist
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error creating artist"
        })
    }
}

exports.getAllArtist = async (req, res) => {
    try {
        const response = await Artist.find({});

        if (!response) {
            return res.status(404).json({
                success: false,
                message: "No artists found"
            })

        }
        res.status(200).json({
            success: true,
            message: "All Artist Fond",
            data: response
        })
    } catch (error) {
        console.log(error);
    }
}

exports.deleteArtistById = async (req, res) => {
    try {
        const id = req.params.id;
        const artist = await Artist.findByIdAndDelete(id);
        if (!artist) {
            return res.status(404).json({
                success: false,
                message: "Artist not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Artist Deleted Successfully",
            data: artist
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Error deleting artist",

        })
    }
}