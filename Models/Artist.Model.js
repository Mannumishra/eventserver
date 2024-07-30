const mongoose = require('mongoose')

const ArtistSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is must required"]
    },
    image:{
        type:String,
        required:[true,"Image is must Required"]
    }
})

const Artist = mongoose.model('Artist', ArtistSchema);
module.exports = Artist
