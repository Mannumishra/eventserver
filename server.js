const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors')

dotenv.config()
const Router = require('./Router/Routers');
const vedioRouter = require('./Router/VedioRouter');
const galleryRouter = require('./Router/GalleyRouter');
const { connectDB } = require('./Config/db');

connectDB()
dotenv.config();

// Middleware setup
app.use(cors())
app.use(express.json())


app.use("/api", Router)
app.use("/api", vedioRouter)
app.use("/api", galleryRouter)
// Sample route

app.set(express.static("./public"))
app.use("/public", express.static("public"))
app.get('/', (req, res) => {
  res.send('Hello, World!');
});



// Port setup
const PORT = process.env.PORT || 7000;
console.log(PORT)

// Start the server
app.listen(7000, () => {
  console.log(`Server is running on port ${PORT}`);
});
