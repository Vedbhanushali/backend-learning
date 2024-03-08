const express = require('express')
const router = express.Router()
const { jwtAuthMiddleware, generateToken } = require('./../jwt')
const Person = require('../models/Person')

router.post('/signup', async (req, res) => {
    try {
        const data = req.body //assuming the request body contains the person data
        console.log(data)
        //create a new person document using mongoose model
        const newPerson = new Person(data)
        console.log(newPerson)
        //save the new person to database
        const response = await newPerson.save()
        console.log('Data saved successfully')

        const payload = {
            id: response.id,
            email: response.email,
            type: response.work
        }
        const token = generateToken(payload)
        console.log('token is', token)

        res.status(200).json({ response, token })
    } catch (err) {
        console.log("Error in saving person", err)
        res.status(500).json({ error: 'Internal server error' })
    }
})

router.post('/login', async (req, res) => {
    try {
        //extract username and password from request body
        const { email, password } = req.body

        //find the user by username
        const user = await Person.findOne({
            email: email
        })

        //if user does not exist or password does not match return error
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({
                error: 'Invalid username or password'
            })
        }

        //generate token
        const payload = {
            id: user.id,
            email: user.email,
            type: user.type
        }

        const token = generateToken(payload)

        //return token as response
        res.json({ token })
    } catch (error) {
        console.log("Error in login", err)
        res.status(500).json({ error: 'Internal server error' })
    }
})

//[JWT] Profile accessible with JWT token route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try {
        const userData = req.user; //user is coming from jwtAuthMiddleware
        console.log("User data", userData);

        const userId = userData.id
        const user = await Person.findById(userId);

        res.status(200).json({ user })
    } catch (error) {
        console.log("Error in profile", err)
        res.status(500).json({ error: 'Internal server error' })
    }
})

//[JWT] viewing all people list accessible with JWT token
router.get('/', jwtAuthMiddleware, async (req, res) => {
    try {
        const data = await Person.find()
        console.log('data fetched')
        res.status(200).json(data);
    } catch (err) {
        console.log("Error : ", error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

//[JWT] filtering people based on worktype with JWT token
router.get('/:workType', jwtAuthMiddleware, async (req, res) => {
    try {
        const workType = req.params.workType
        if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
            const response = await Person.find({ type: workType })
            console.log('response fetched');
            res.status(200).json(response)
        } else {
            res.status(404).json({ error: 'Invalid work type' })
        }
    } catch (error) {
        console.log("Error : ", error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

//[JWT] editing personal details with JWT token only
router.put('/', jwtAuthMiddleware, async (req, res) => {
    try {
        const userData = req.user;
        const personId = userData.id;
        const updatedPesonData = req.body
        const response = await Person.findByIdAndUpdate(personId, updatedPesonData, {
            new: true, //return the updated document
            runValidators: true, //run mongoose validation
        })
        if (!response) {
            //when person with id does not exist then response will be null
            return res.status(404).json({ error: 'Person not found' })
        }
        console.log('data updated')
        res.status(200).json(response)
    } catch (error) {
        console.log("Error : ", error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

//[JWT] deleting self person
router.delete('/', jwtAuthMiddleware, async (req, res) => {
    try {
        const userData = req.user;
        const personId = userData.id;
        const response = await Person.findByIdAndDelete(personId)
        if (!response) {
            //when person with id does not exist then response will be null
            return res.status(404).json({ error: 'Person not found' })
        }
        console.log('data deleted')
        res.status(200).json({ message: 'Person deleted successfully' })
    } catch (error) {
        console.log("Error : ", error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

module.exports = router