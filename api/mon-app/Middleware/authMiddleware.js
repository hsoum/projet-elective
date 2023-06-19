const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
  // Get the access token from the request headers
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ message: 'Access token not found' });
  }

  // Verify the token
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    // Store the user ID in the request for further processing
    req.userId = user.userId;

    next();
  });
}

module.exports = authenticateToken;
