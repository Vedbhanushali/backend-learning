//database connection file using mongoose 
const mongoose = require('mongoose')

//define the mongoDB connection URL
const mongoURL = 'mongodb://0.0.0.0:27017/hotels' //here hotels is database name if not present it will create new
//set up mongDB connection
mongoose.connect(mongoURL)

//get default connection
//mongoose maintains a default connection object repersenting the MonogoDB connection
const db = mongoose.connection;

//defining event listeners for database connection
db.on('connected', () => {
    console.log('Connected to MonogoDB server');
})

db.on('error', (err) => {
    console.log('MongoDB connection error', err);
})

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
})

//export the database connection
module.exports = db;