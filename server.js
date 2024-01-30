require('dotenv').config()
const express = require('express')
const db = require('./db')
const app = express()
const passport = require('./auth')
const bodyParser = require('body-parser')
app.use(bodyParser.json())


const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`)
    next();
}
app.use(logRequest)

app.use(passport.initialize())

const localAuthMiddleware = passport.authenticate('local', { session: false })

app.get('/', localAuthMiddleware, function (req, res) {
    res.send('welcome to Cosmos hotel')
})

const personRoutes = require('./routes/personRoutes')
const menuRoutes = require('./routes/menuRoutes')

app.use('/person', personRoutes)
app.use('/menu', localAuthMiddleware, menuRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("server is listening on port 3000")
})

