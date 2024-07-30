const mongoose = require('mongoose')

const connectDB = async(req,res) => {
    try {
        await mongoose.connect(process.env.MONGO_LINK)
        console.log('MongoDB is Connected')
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

module.exports = connectDB