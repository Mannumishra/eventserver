const { createGallery, getGallery } = require("../Controllers/GalleryControllar")
const upload = require("../Middleware/Multer")

const galleryRouter = require("express").Router()


galleryRouter.post("/gallery", upload.single("gallery"), createGallery)
galleryRouter.get("/gallery", getGallery)

module.exports = galleryRouter