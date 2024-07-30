const { CreateArtist, getAllArtist } = require("../Controllers/Artist.Controller")
const upload = require("../Middleware/Multer")

const Router = require("express").Router()


Router.post("/artist",upload.single("image") ,CreateArtist)
Router.get("/artist" ,getAllArtist)

module.exports = Router