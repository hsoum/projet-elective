const FoodOrder = require('../models/order');
const Article = require('../models/article');
const Menu = require('../models/menu');

// Find all orders and populate the articles and menus
const getAllOrders = async (req, res) => {
    try {
        // Find all orders and populate the articles and menus
        const orders = await FoodOrder.find()
            .populate('articles')
            .populate({
                path: 'menus',
                populate: {
                    path: 'articles',
                    model: 'Article'
                }
            })
        console.log(orders);
        res.json({ orders });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve orders', error: error.message });
    }
};

const getAllArticles = async (req, res) => {
    try {
        // Récupérer tous les articles
        const articles = await Article.find();
        res.json({ articles });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve articles', error: error.message });
    }
};

module.exports = { getAllOrders, getAllArticles };