const { createGallery, getGallery, getSingleGallery, deleteGallery, updateGallery } = require("../Controllers/GalleryControllar")
const upload = require("../Middleware/Multer")

const galleryRouter = require("express").Router()


galleryRouter.post("/gallery", upload.single("gallery"), createGallery)
galleryRouter.get("/gallery", getGallery)
galleryRouter.get("/gallery/:_id", getSingleGallery)
galleryRouter.delete("/gallery/:_id", deleteGallery)
galleryRouter.put("/gallery/:_id", upload.single("gallery"), updateGallery)

module.exports = galleryRouter