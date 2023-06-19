const FoodOrder = require('../models/Order');

// Controller action for handling the POST request
const createOrder = async (req, res) => {
  try {
    // Extract the order data from the request body
    const { orderId, customerName, items, totalPrice } = req.body;

    // Create a new instance of FoodOrder model with the extracted data
    const newOrder = new FoodOrder({
      orderId,
      customerName,
      items,
      totalPrice
    });

    // Save the new order to the database
    await newOrder.save();

    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
};


const editOrder = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { customerName, items, totalPrice } = req.body;
  
      // Find the order by orderId
      const order = await FoodOrder.findOne({ orderId });
  
      // Check if the order exists
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      // Check if the order is already confirmed
      if (order.isConfirmed) {
        return res.status(400).json({ message: 'Cannot edit a confirmed order' });
      }
  
      // Update the order fields
      order.customerName = customerName;
      order.items = items;
      order.totalPrice = totalPrice;
  
      // Save the updated order
      await order.save();
  
      res.json({ message: 'Order updated successfully', order });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update order', error: error.message });
    }
  };
  
  module.exports = {createOrder, editOrder };
