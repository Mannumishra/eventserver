const mongoose = require('mongoose')

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_LINK)
        console.log('MongoDB is Connected')
    } catch (error) {
        console.log(error)
    }
}

module.exports = {connectDB}