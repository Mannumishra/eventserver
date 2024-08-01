const { CreateVideo, getAllVideo } = require("../Controllers/Video.controller");
const express = require('express');
const upload = require("../Middleware/Multer");

const videoRouter = express.Router();

videoRouter.post("/video", upload.single("video"), CreateVideo);
videoRouter.get("/video", getAllVideo);

module.exports = videoRouter;
