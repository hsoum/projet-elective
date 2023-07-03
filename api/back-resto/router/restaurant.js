const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurant');

const authenticateToken = require('../Middleware/authMiddleware');
const upload = require('../Middleware/upload');

// Create a restaurant
router.post('/', authenticateToken, upload.single('photo'), restaurantController.createRestaurant);

// Get all restaurants
router.get('/', authenticateToken, restaurantController.getAllRestaurants);
// Get 10 new restaurants 
router.get('/order', authenticateToken, restaurantController.getNewRestaurants);
router.put('/confirm/:id', authenticateToken, restaurantController.confirmOrder);
// Get a single restaurant by ID
router.get('/:id', authenticateToken, restaurantController.getRestaurantById);

// Update a restaurant by ID
router.put('/:id', authenticateToken, upload.single('photo'), restaurantController.updateRestaurantById);

// Delete a restaurant by ID
router.delete('/:id', authenticateToken, restaurantController.deleteRestaurantById);

module.exports = router;