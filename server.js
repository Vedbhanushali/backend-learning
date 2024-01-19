const express = require('express')
const app = express()
const db = require('./db')
//body parser is a middleware library for express js used to parse and extract body of incoming http requests
const bodyParser = require('body-parser')
app.use(bodyParser.json()) //based on type of format of data send in api request need to parse accordingly here sending json data in body so will use json parsing
//form data available in req.body

app.get('/', function (req, res) {
    res.send('welcome to Cosmos hotel')
})

//importing router files
const personRoutes = require('./routes/personRoutes')
const menuRoutes = require('./routes/menuRoutes')

app.use('/person', personRoutes)
app.use('/menu', menuRoutes)

app.listen(3000, () => {
    console.log("server is listening on port 3000")
})