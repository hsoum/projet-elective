var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const passport = require('../passport-config');
const secretKey = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken'); // Add this line
const jwtUtils = require('../jwtUtils');


const UserController = require('../controllers/userController');

router.post('/register', UserController.createUser);

router.post('/login', express.json(), (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err) {
        return next(err);
      }
  
      if (!user) {
        return res.status(401).json({ message: info.message });
      }
  
      // Generate access token and refresh token
      const accessToken = jwtUtils.generateAccessToken(user.Id);
      const refreshToken = jwtUtils.generateRefreshToken(user.Id);

      // Return the access token and refresh token to the client
      res.json({ accessToken, refreshToken });
    })(req, res, next);
  });

  router.post('/logout', (req, res) => {
    // Clear the refresh token from the cookie
    res.clearCookie('refreshToken');
    res.sendStatus(200);
  });
  

  router.post('/refresh-token', (req, res) => {
    const refreshToken = req.body.refreshToken;
  
    // Verify the refresh token
    try {
      const decoded = jwtUtils.verifyToken(refreshToken);
      const userId = decoded.userId;
  
      // Generate a new access token
      const accessToken = jwtUtils.generateAccessToken(userId);
  
      res.json({ accessToken });
    } catch (error) {
      res.status(401).json({ error: 'Invalid refresh token' });
    }
  });
  
  

  module.exports = router;
