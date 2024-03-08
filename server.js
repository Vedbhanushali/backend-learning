require('dotenv').config()
const express = require('express')
const db = require('./db')
const app = express()
const passport = require('./auth')
const localAuthMiddleware = passport.authenticate('local', { session: false })
const bodyParser = require('body-parser')
app.use(bodyParser.json())


const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`)
    next();
}
app.use(logRequest)
app.use(passport.initialize())

app.get('/', function (req, res) {
    res.send('Welcome of FoodZilla restaurant -- by Ved Bhanushali')
})

app.get('/verify', localAuthMiddleware, function (req, res) {
    res.send('Verification successful')
})

const personRoutes = require('./routes/personRoutes')
const menuRoutes = require('./routes/menuRoutes')
const orderRoutes = require('./routes/orderRoutes')

app.use('/person', personRoutes)
app.use('/menu', menuRoutes)
app.use('/order', orderRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("server is listening on port 3000")
})

