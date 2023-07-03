const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.JWT_SECRET;
const { Client } = require('../models/User');
const UserServices = require('../Servicee/userServices');

async function authenticateToken(req, res, next) {
  // Get the access token from the request headers
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ message: 'Access token not found' });
  }

  // Verify the token
  jwt.verify(token, secretKey, async (err, user) => {
    if (err) {
      console.log(err)
      return res.status(403).json({ message: 'Invalid token' });
    }
    
    // Store the user ID in the request for further processing
    req.userid = user.userid;
    
    try {
      const client = await UserServices.getUserById(user.userid);
      
      // Check user role
    if (client.Role !== 'restaurateur') {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
      next();
    } catch (error) {
      console.error('Error retrieving user:', error);
      return res.status(404).json({ message: 'User not found' });
    }
  });
}

module.exports = authenticateToken;
