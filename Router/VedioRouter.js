const { CreateVideo, getAllVideo, deleteVideo, getSingleVideo, updateVideo } = require("../Controllers/Video.controller");
const express = require('express');

const videoRouter = express.Router();

videoRouter.post("/video", CreateVideo);
videoRouter.get("/video", getAllVideo);
videoRouter.delete("/video/:_id", deleteVideo);
videoRouter.get("/video/:_id", getSingleVideo);
videoRouter.put("/video/:_id", updateVideo);

module.exports = videoRouter;
