var express = require('express');
var router = express.Router();
const authenticateToken = require('../Middleware/authMiddleware');
const orderController = require('../controllers/orderController');

// Route for creating a new food order
router.post('/', authenticateToken, orderController.createOrder);
// Route for editing an existing food order
router.put('/:orderId', authenticateToken, orderController.editOrder)
/// Get all orders
router.get('/', authenticateToken, orderController.getAllOrders);
// Define the route for retrieving a single order
router.get('/:id', authenticateToken, orderController.getOrderById);


module.exports = router;