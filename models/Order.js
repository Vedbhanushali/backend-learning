const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    placed_at: {
        type: String,
        required: true
    },
    placed_by: { //person id
        type: String,
        required: true
    },
    item: {
        type: String, //menu item id
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['cooking', 'delivered']
    },
})

//Menu model
const Order = mongoose.model('Order', orderSchema)
module.exports = Order