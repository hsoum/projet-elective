var express = require('express');
var router = express.Router();
const { User } = require('../models/User');
const UserController = require('../controllers/userController');
const passport = require('passport');
const authenticateToken = require('../Middleware/authMiddleware');


/* GET users listing. */
// Create a user
router.post('/', UserController.createUser);

// Get a user by ID
router.get('/:id', authenticateToken, UserController.getUserById);


// Update a user
router.put('/:id', authenticateToken, UserController.updateUser);

// Delete a user
router.delete('/:id', authenticateToken, UserController.deleteUser);

module.exports = router;
