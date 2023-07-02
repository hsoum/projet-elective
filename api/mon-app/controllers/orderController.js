const FoodOrder = require('../models/Order');
const Article = require('../models/article');
const Menu = require('../models/menu');
//const axios = require('axios');


const createOrder = async (req, res) => {
  try {
    // Extract the order data from the request body
    const { orderId, articleIds, menuIds } = req.body;
    // Get the customerId from the authenticated user
    const customerId = req.userId;

    // Find the articles and calculate the total price
    const articles = await Article.find({ _id: { $in: articleIds } });
    const articleTotalPrice = articles.reduce((total, article) => total + article.price, 0);


    // Find the menus and calculate the total price

    const menus = await Menu.find({ _id: { $in: menuIds } });
    const menuTotalPrice = menus.reduce((total, menu) => total + menu.price, 0);


    // Calculate the overall total price
    const totalPrice = (articleTotalPrice || 0) + (menuTotalPrice || 0);

    // Get Restaurant Id
    const restaurantIds = articles.map((article) => article.restaurant_id);

    const newOrder = new FoodOrder({
      orderId,
      customerId,
      articles: articleIds,
      menus: menuIds,
      totalPrice,
      restaurant_id: restaurantIds[0],
    });

    // Save the new order to the database
    await newOrder.save();

    // const rsp = axios.post(`http://localhost:8002/ws/commande/post`, {
    //   customerId: customerId,
    //   orderId: orderId
    // });
    // rsp
    //   .then(AxiosRsp => {
    //     console.log(AxiosRsp)
    //   })
    //   .catch(error => {
    //     return `unexpected catche error`
    //   });

    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
};


const editOrder = async (req, res) => {
  try {
    const { orderId, articleIds, menuIds } = req.body;
    const customerId = req.userId;

    // Find the existing order by ID
    const order = await FoodOrder.findOne({ orderId });

    // Check if the order exists
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if the order is already confirmed
    if (order.isConfirmed === 'confirmed') {
      return res.status(400).json({ message: 'Cannot edit a confirmed order' });
    }

    // Find the articles and calculate the total price
    const articles = await Article.find({ _id: { $in: articleIds } });
    const articleTotalPrice = articles.reduce((total, article) => total + article.price, 0);

    // Find the menus and calculate the total price
    const menus = await Menu.find({ _id: { $in: menuIds } });
    const menuTotalPrice = menus.reduce((total, menu) => total + menu.price, 0);

    // Calculate the overall total price
    const totalPrice = (articleTotalPrice || 0) + (menuTotalPrice || 0);

    // Update the order with the new data
    order.articles = articleIds;
    order.menus = menuIds;
    order.totalPrice = totalPrice;

    // Save the updated order to the database
    await order.save();

    res.status(200).json({ message: 'Order updated successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order', error: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    // Get the customerId from the authenticated user
    const customerId = req.userId;

    // Find all orders for the customer and populate the articles and menus
    const orders = await FoodOrder.find({ customerId })
      .populate('articles')
      .populate({
        path: 'menus',
        populate: {
          path: 'articles',
          model: 'Article'
        }
      })
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve orders', error: error.message });
  }
};


const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;

    // Find the order by its ID and populate the articles and menus
    const order = await FoodOrder.findOne({ orderId })
      .populate('articles')
      .populate('menus');

    // Check if the order exists
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve order', error: error.message });
  }
};



module.exports = { createOrder, editOrder, getAllOrders, getOrderById };
