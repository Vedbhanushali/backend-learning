require('dotenv').config()
const express = require('express')
const db = require('./db')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.send('welcome to Cosmos hotel')
})

const personRoutes = require('./routes/personRoutes')
const menuRoutes = require('./routes/menuRoutes')

app.use('/person', personRoutes)
app.use('/menu', menuRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("server is listening on port 3000")
})