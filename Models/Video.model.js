const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    video: {
        type: String,
        required: [true, "Video is required"]
    }
});

const video = mongoose.model('video', videoSchema);
module.exports = video;
