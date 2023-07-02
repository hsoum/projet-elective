var express = require('express');
var router = express.Router();
const authenticateToken = require('../Middleware/authMiddleware');
const commController = require('../controllers/commController');

router.get('/', authenticateToken, commController.getAllOrders);
router.get('/articles', authenticateToken, commController.getAllArticles);

module.exports = router;
