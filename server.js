require('dotenv').config()
const express = require('express')
const db = require('./db')
const app = express()
const passport = require('passport')
const localStrategy = require('passport-local') //passport local localstrategy is username password based authentication
const bodyParser = require('body-parser')
app.use(bodyParser.json())

//middleware logging function
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`)
    next(); //this is very important
    /*
        next function
        In express.js the next() function is a callback that signals to express
        that the current middleware function has completed its processing and that its
        time to move on to the next middleware function of route handler in the chain
    */
}

// Example of using middleware to route path
// app.get('/', logRequest, function (req, res) {
//     res.send('welcome to Cosmos hotel')
// })

// Example of global middleware applied on all routes
app.use(logRequest)

passport.use(new localStrategy(async (username, password, done) => {
    //authentication logic here
    try {
        console.log(`Received crenditals ${username} ${password}`)
        const user = await Person.findOne({ username: username });
        if (!user) {
            return done(null, false, { message: 'Incorrect username' }); // is callback function which signal complettion of of authentication process @params (error,user,info)
        }
        const isPasswordMatch = user.password == password ? true : false;
        if (!isPasswordMatch) {
            return done(null, false, { message: 'Password not matched' });
        }
        return done(null, user);
    } catch (err) {
        console.log(err)
        return done(err)
    }
}))

app.use(passport.initialize())

app.get('/', passport.authenticate('local', { session: false }), function (req, res) {
    res.send('welcome to Cosmos hotel')
})

const personRoutes = require('./routes/personRoutes')
const menuRoutes = require('./routes/menuRoutes')

app.use('/person', personRoutes)
app.use('/menu', menuRoutes)
//Example of using middleware in routes
// app.use('/menu',logRequest,menuRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("server is listening on port 3000")
})

