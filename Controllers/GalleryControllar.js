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

const getGallery = async(req,res)=>{
    try {
        const data = await galley.find()
        if(!data){
            return res.status(404).json({
                success:false,
                mess:"Gallery not found"
            })
        }
        else{
            res.status(200).json({
                success:true,
                mess:"Gallery found",
                data:data
            }) 
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            mess:"Internal server errro"
        })
    }
}



module.exports = {
    createGallery ,getGallery
}