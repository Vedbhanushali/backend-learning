const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    placed_at: {
        type: String,
        required: true
    },
    placed_by: { //person id
        type: Number,
        required: true
    },
    item: {
        type: Number, //menu item id
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