const express = require('express')
const router = express.Router()
const { jwtAuthMiddleware } = require('./../jwt')
const MenuItem = require('../models/MenuItem')

//[public] any body can view menu items
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

//[public] any body can filter menu items based on taste
router.get('/:taste', async (req, res) => {
    try {
        const taste = req.params.taste
        if (taste == 'sweet' || taste == 'spicy' || taste == 'sour') {
            const response = await MenuItem.find({ taste: taste })
            console.log('response fetched');
            res.status(200).json(response)
        } else {
            res.status(404).json({ error: 'Invalid taste type' })
        }
    } catch (error) {
        console.log("Error : ", error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

//[jwt] only chef or manager can add menu item
router.post('/', jwtAuthMiddleware, async (req, res) => {
    try {
        const userData = req.user
        if (['chef', 'manager'].includes(userData.type)) {
            const data = req.body
            const newMenuItem = new MenuItem(data)
            const response = await newMenuItem.save()
            console.log('Data saved successfully')
            res.status(200).json(response)
        } else {
            return res.status(401).json({ error: 'Not authorized' })
        }
    } catch (err) {
        console.log("Error in saving menu item", err)
        res.status(500).json({ error: 'Internal server error' })
    }
})

//[jwt] only manager / chef can edit menu items
router.put('/:id', jwtAuthMiddleware, async (req, res) => {
    try {
        const userData = req.user
        if (['chef', 'manager'].includes(userData.type)) {
            const menuId = req.params.id;
            const updatedMenuData = req.body
            const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuData, {
                new: true, //return the updated document
                runValidators: true, //run mongoose validation
            })
            if (!response) {
                //when menu with id does not exist then response will be null
                return res.status(404).json({ error: 'Menu not found' })
            }
            console.log('data updated')
            res.status(200).json(response)
        } else {
            return res.status(401).json({ error: 'Not authorized' })
        }
    } catch (error) {
        console.log("Error : ", error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

//[jwt] only manager can delete menu items
router.delete('/:id', jwtAuthMiddleware, async (req, res) => {
    try {
        const userData = req.user
        if (userData.type == 'manager') {
            const menuId = req.params.id;
            const response = await MenuItem.findByIdAndDelete(menuId)
            if (!response) {
                //when menu with id does not exist then response will be null
                return res.status(404).json({ error: 'MenuItem not found' })
            }
            console.log('data deleted')
            res.status(200).json({ message: 'MenuItem deleted successfully' })
        } else {
            return res.status(401).json({ error: 'Not authorized' })
        }
    } catch (error) {
        console.log("Error : ", error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

module.exports = router