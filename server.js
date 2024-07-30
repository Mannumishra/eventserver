const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors')

const Router = require('./Router/Routers');
const vedioRouter = require('./Router/VedioRouter');
const galleryRouter = require('./Router/GalleyRouter');
const { connectDB } = require('./Config/db');

connectDB()
dotenv.config();

// Middleware setup
app.use(cors())
app.use(express.json())
app.set(express.static("public"))
app.use("/public", express.static("public"))

app.use("/api" ,Router)
app.use("/api" ,vedioRouter)
app.use("/api" ,galleryRouter)
// Sample route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});



// Port setup
const PORT = process.env.PORT || 3000;
console.log(PORT)

// Start the server
app.listen(9000, () => {
  console.log(`Server is running on port ${PORT}`);
});
