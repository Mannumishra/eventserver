const { uploadImage } = require("../Utils/Cloudnary");
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


exports.getArtist = async(req,res)=>{
    try {
        const data = await Artist.find()
        if(!data){
            return res.status(404).json({
                success:false,
                mess:"Artist Not Found"
            })
        }
        else{
            res.status(200).json({
                success:true,
                message:"Artists found successfully",
                data:data
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal server error"
        });
    }
}