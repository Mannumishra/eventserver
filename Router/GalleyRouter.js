const { createGallery } = require("../Controllers/GalleryControllar")
const upload = require("../Middleware/Multer")

const galleryRouter = require("express").Router()


galleryRouter.post("/gallery", upload.single("gallery"), createGallery)

module.exports = galleryRouter