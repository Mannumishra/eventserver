const mongoose = require('mongoose')

const connectDB = async() => {
    try {
        await mongoose.connect("mongodb+srv://hiteshy468:MWaYu4DttSO4gncU@cluster0.h0iedd9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log('MongoDB is Connected')
    } catch (error) {
        console.log(error)
    }
}

module.exports = {connectDB}