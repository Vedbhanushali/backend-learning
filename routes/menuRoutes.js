const express = require('express')
const router = express.Router()

const MenuItem = require('../models/MenuItem')

router.post('/', async (req, res) => {
    try {
        const data = req.body
        const newMenuItem = new MenuItem(data)
        const response = await newMenuItem.save()
        console.log('Data saved successfully')
        res.status(200).json(response)
    } catch (err) {
        console.log("Error in saving person", err)
        res.status(500).json({ error: 'Internal server error' })
    }
})

router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find()
        console.log('data fetched')
        res.status(200).json(data);
    } catch (err) {
        console.log("Error : ", err)
        res.status(500).json({ error: 'Internal server error' })
    }
})

router.get('/:taste', async (req, res) => {
    try {
        const taste = req.params.taste
        if (taste == 'sweet' || taste == 'spicy' || taste == 'sour') {
            const response = await MenuItem.find({ taste: taste })
            console.log('response fetched');
            res.status(200).json(response)
        } else {
            res.status(404).json({ error: 'Invalid work type' })
        }
    } catch (error) {
        console.log("Error : ", err)
        res.status(500).json({ error: 'Internal server error' })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const menuId = req.params.id;
        const updatedMenuData = req.body()
        const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuData, {
            new: true, //return the updated document
            runValidators: true, //run mongoose validation
        })
        if (!response) {
            //when person with id does not exist then response will be null
            return res.status(404).json({ error: 'Menu not found' })
        }
        console.log('data updated')
        res.status(200).json(response)
    } catch (error) {
        console.log("Error : ", err)
        res.status(500).json({ error: 'Internal server error' })
    }
})

router.delete(':/id', async (req, res) => {
    try {
        const menuId = req.params.id;

        const response = await MenuItem.findByIdAndDelete(menuId)
        if (!response) {
            //when person with id does not exist then response will be null
            return res.status(404).json({ error: 'MenuItem not found' })
        }
        console.log('data deleted')
        res.status(200).json({ message: 'MenuItem deleted successfully' })
    } catch (error) {
        console.log("Error : ", err)
        res.status(500).json({ error: 'Internal server error' })
    }
})

module.exports = router