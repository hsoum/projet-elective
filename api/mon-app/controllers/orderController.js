const FoodOrder = require('../models/Order');
const axios = require('axios');


// Controller action for handling the POST request
const createOrder = async (req, res) => {
  try {
    // Extract the order data from the request body
    const { orderId, items, totalPrice } = req.body;
    // Get the customerId from the authenticated user
    const customerId = req.userId;
    // Log the customer ID
    
    const newOrder = new FoodOrder({
      orderId,
      customerId,
      items,
      totalPrice
    });

    // Save the new order to the database
    await newOrder.save();

    const rsp = axios.post(`http://localhost:8002/ws/commande/post`, {
          customerId : customerId,
          orderId : orderId
        });
        rsp
        .then(AxiosRsp => {
          console.log(AxiosRsp)
        })
        .catch(error => {
        return `unexpected catche error`
        });

    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
};


const editOrder = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { items, totalPrice } = req.body;
  
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
      const customerId = req.userId;
      // Update the order fields
      order.customerId = customerId;
      order.items = items;
      order.totalPrice = totalPrice;
  
      // Save the updated order
      await order.save();
  
      res.json({ message: 'Order updated successfully', order });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update order', error: error.message });
    }
  };

  const getAllOrders = async (req, res) => {
    try {
      // Get the customerId from the authenticated user
      const customerId = req.userId;
  
      // Find all orders for the customer
      const orders = await FoodOrder.find({ customerId });
  
      res.json({ orders });
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve orders', error: error.message });
    }
  };
  
  module.exports = {createOrder, editOrder,getAllOrders };
