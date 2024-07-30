const mongoose= require("mongoose")

const gallerySchema = new mongoose.Schema({
    gallery:{
        type:String,
        required:[true,"Gallery Image is must required"]
    }
})

const galley = mongoose.model("gallery" , gallerySchema)

module.exports = galley