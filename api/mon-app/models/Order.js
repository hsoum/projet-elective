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
  items: [
    {
      name: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
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
    type: Boolean,
    default: false
  }
});

// Create the FoodOrder model
const FoodOrder = mongoose.model('FoodOrder', foodOrderSchema);

module.exports = FoodOrder;
