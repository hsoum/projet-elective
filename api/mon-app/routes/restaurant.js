const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurant');
const articlesController = require('../controllers/article');

const authenticateToken = require('../Middleware/authMiddleware');




// Get all restaurants
router.get('/', authenticateToken, restaurantController.getAllRestaurants);
// Get 10 new restaurants 
router.get('/new', authenticateToken, restaurantController.getNewRestaurants);

// Route for creating a new food order
router.get('/articles', authenticateToken,articlesController.getAllArticles);

module.exports = router;