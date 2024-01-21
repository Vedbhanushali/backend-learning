require('dotenv').config()
const mongoose = require('mongoose')
const mongoURL = process.env.MONGODB_URL || process.env.MONGODB_URL_LOCAL
mongoose.connect(mongoURL)

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MonogoDB server');
})

db.on('error', (err) => {
    console.log('MongoDB connection error', err);
})

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
})

module.exports = db;