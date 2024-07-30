const mongoose = require('mongoose')

const connectDB = async() => {
    try {
        await mongoose.connect("mongodb+srv://mannu22072000:2OxqlDWMMsweOj9u@cluster0.rvg2lap.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log('MongoDB is Connected')
    } catch (error) {
        console.log(error)
    }
}

module.exports = {connectDB}