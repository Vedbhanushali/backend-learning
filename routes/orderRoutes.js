const express = require('express')
const router = express.Router()
const { jwtAuthMiddleware } = require('./../jwt')
const Order = require('../models/Order')
const MenuItem = require('../models/MenuItem')

//[public] any body can view orders list
router.get('/', async (req, res) => {
    try {
        const data = await Order.find()
        console.log('data fetched')
        res.status(200).json(data);
    } catch (err) {
        console.log("Error : ", err)
        res.status(500).json({ error: 'Internal server error' })
    }
})

//[public] any body can filter order based on status of their order
router.get('/:status', async (req, res) => {
    try {
        const status = req.params.status
        if (status == 'cooking' || status == 'delivered') {
            const response = await Order.find({ status: status })
            console.log('response fetched');
            res.status(200).json(response)
        } else {
            res.status(404).json({ error: 'Invalid status type' })
        }
    } catch (error) {
        console.log("Error : ", error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

//[public] any body can view details of particular order
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const response = await Order.find({ id: id })
        if (!response) {
            //when order does not exist with id
            return res.status(404).json({ error: 'order not found' })
        }
        console.log('response fetched');
        res.status(200).json(response)
    } catch (error) {
        console.log("Error : ", error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

//[public] any body can create order
router.post('/', async (req, res) => {
    try {
        const data = req.body
        const newOrder = new Order(data)
        const menuId = newOrder.item
        const menuUpdateResponse = await MenuItem.findByIdAndUpdate(menuId, {
            $inc: { num_sales: 1 }
        }, {
            new: true, // Return the updated document
            runValidators: true // Run Mongoose validation
        })
        if (menuUpdateResponse) {
            return res.status(404).json({ error: 'Menu not found' });
        }
        const response = await newOrder.save()
        console.log('Data saved successfully')
        res.status(200).json(response)
    } catch (err) {
        console.log("Error in creating order item", err)
        res.status(500).json({ error: 'Internal server error' })
    }
})

//[jwt] only manager / chef can edit order details 
router.put('/:id', jwtAuthMiddleware, async (req, res) => {
    try {
        const userData = req.user
        if (['chef', 'manager'].includes(userData.type)) {
            const orderId = req.params.id;
            const updatedOrderData = req.body //changing status of order
            const response = await Order.findByIdAndUpdate(orderId, updatedOrderData, {
                new: true, //return the updated document
                runValidators: true, //run mongoose validation
            })
            if (!response) {
                //when menu with id does not exist then response will be null
                return res.status(404).json({ error: 'Order not found' })
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

//[jwt] only manager can delete Order TODO
router.delete('/:id', jwtAuthMiddleware, async (req, res) => {
    try {
        const userData = req.user
        if (userData.type == 'manager') {
            const orderId = req.params.id;
            const response = await Order.findByIdAndDelete(orderId)
            if (!response) {
                //when menu with id does not exist then response will be null
                return res.status(404).json({ error: 'order not found' })
            }
            console.log('data deleted')
            res.status(200).json({ message: 'Order deleted successfully' })
        } else {
            return res.status(401).json({ error: 'Not authorized' })
        }
    } catch (error) {
        console.log("Error : ", error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

module.exports = router