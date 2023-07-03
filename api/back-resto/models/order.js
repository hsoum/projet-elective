const mongoose = require('mongoose');


// Define the schema for the food order data
const foodOrderSchema = new mongoose.Schema({
    orderId: {
        type: Number,
        required: true
    },
    customerId: {
        type: Number,
        required: true
    },
    articles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Article',
        },
    ],
    menus: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Menu',
        },
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    isDelivered: {
        type: Boolean,
        default: false
    },
    isConfirmed: {
        type: String,
        required: true,
        default: "pending",
    },
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    }
    
});

// Create the FoodOrder model
const FoodOrder = mongoose.model('FoodOrder', foodOrderSchema);

module.exports = FoodOrder;