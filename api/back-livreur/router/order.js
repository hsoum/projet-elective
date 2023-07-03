const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/order');
const authenticateToken = require('../Middleware/authMiddleware');


// Get All oreders for delivery guy (historique des commande livreuer)
router.get('/', authenticateToken, OrderController.getOrdersBydelivryId);
// Route to confirm an order
router.put('/confirm/:id', authenticateToken, OrderController.confirmOrder);
// Route to deliver an order
router.put('/deliver/:id', authenticateToken, OrderController.DeliverOrder);

// get orders confirmed
router.get('/confirmed/:restaurantId', authenticateToken, OrderController.getConfirmedOrders);

// get pending orders
router.get('/pending', authenticateToken, OrderController.getPendingOrders);

module.exports = router;    