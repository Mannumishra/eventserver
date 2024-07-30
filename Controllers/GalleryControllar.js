const galley = require("../Models/GallerModel")

const createGallery = async(req,res)=>{
    try {
        const data = new galley()
        const galleryImage = req.file.path 
        data.gallery = galleryImage
        await data.save()
        res.status(200).json({
            success:true,
            mess:"New image add in gallery successfully",
            data:data
        })
    } catch (error) {
        res.status(500).json({
            success:true,
            mess:"Internal server error",
        })
    }
}



module.exports = {
    createGallery
}