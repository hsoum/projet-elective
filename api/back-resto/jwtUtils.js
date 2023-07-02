const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.JWT_SECRET;

// Generate an access token
const generateAccessToken = (userid) => {
  console.log(userid);
  return jwt.sign({ userid }, secretKey, { expiresIn: '1h' }); // Set appropriate expiration time for the access token
};

// Generate a refresh token
const generateRefreshToken = (userid) => {
  return jwt.sign({ userid }, secretKey, { expiresIn: '7d' }); // Set appropriate expiration time for the refresh token
};
// Verify token
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
};