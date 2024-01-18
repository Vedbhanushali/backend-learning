const express = require('express')
const app = express()
const db = require('./db')
//body parser is a middleware library for express js used to parse and extract body of incoming http requests
const bodyParser = require('body-parser')
app.use(bodyParser.json()) //based on type of format of data send in api request need to parse accordingly here sending json data in body so will use json parsing
//form data available in req.body

const Person = require('./models/Person')
const MenuItem = require('./models/MenuItem')

app.listen(3000, () => {
    console.log("server is listening on port 3000")
})

app.get('/', function (req, res) {
    res.send('welcome to Cosmos hotel')
})

app.post('/person', async (req, res) => {
    try {
        const data = req.body //assuming the request body contains the person data

        //create a new person document using mongoose model
        const newPerson = new Person(data)

        //save the new person to database
        const response = await newPerson.save()
        console.log('Data saved successfully')
        res.status(200).json(response)
    } catch (err) {
        console.log("Error in saving person", err)
        res.status(500).json({ error: 'Internal server error' })
    }
})

app.get('/person', async (req, res) => {
    try {
        const data = await Person.find()
        console.log('data fetched')
        res.status(200).json(data);
    } catch (err) {
        console.log("Error : ", err)
        res.status(500).json({ error: 'Internal server error' })
    }
})

app.post('/menu', async (req, res) => {
    try {
        const data = req.body
        const newMenuItem = new MenuItem(data)
        const response = await MenuItem.save()
        console.log('Data saved successfully')
        res.status(200).json(response)
    } catch (err) {
        console.log("Error in saving person", err)
        res.status(500).json({ error: 'Internal server error' })
    }
})

app.get('/menu', async (req, res) => {
    try {
        const data = await MenuItem.find()
        console.log('data fetched')
        res.status(200).json(data);
    } catch (err) {
        console.log("Error : ", err)
        res.status(500).json({ error: 'Internal server error' })
    }
})