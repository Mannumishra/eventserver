
const { CreateArtist, getArtist, updateArtist, deleteArtist, getSingleArtist } = require("../Controllers/Artist.Controller")
const upload = require("../Middleware/Multer")

const Router = require("express").Router()


Router.post("/artist", upload.single("image"), CreateArtist)
Router.put("/artist/:_id", upload.single("image"), updateArtist)
Router.get("/artist", getArtist)
Router.get("/artist/:_id", getSingleArtist)
Router.delete("/artist/:_id", deleteArtist)

module.exports = Router