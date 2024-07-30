const { CreateVideo } = require("../Controllers/Video.controller");
const multer = require("multer");
const express = require('express');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/vedio');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({ storage: storage });

const videoRouter = express.Router();

videoRouter.post("/video", upload.single("video"), CreateVideo);

module.exports = videoRouter;
