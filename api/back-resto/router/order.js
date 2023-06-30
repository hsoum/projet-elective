const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/order');
const authenticateToken = require('../Middleware/authMiddleware');


// Get All restaurant's orders
router.get('/:restaurantId', authenticateToken, OrderController.getOrdersByRestaurantId);
// Route to confirm an order
router.put('/confirm/:id', authenticateToken, OrderController.confirmOrder);
// Route to refuse an order
router.put('/refuse/:id', authenticateToken, OrderController.refuseOrder);
// get orders confirmed
router.get('/confirmed/:restaurantId', authenticateToken, OrderController.getConfirmedOrders);
// get orders refused
router.get('/refused/:restaurantId', authenticateToken, OrderController.getRefusedOrders);
// get pending orders
router.get('/pending/:restaurantId', authenticateToken, OrderController.getPendingOrders);

module.exports = router;    