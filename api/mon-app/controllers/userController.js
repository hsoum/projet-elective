const UserServices = require('../Servicee/userServices');
const secretKey = process.env.JWT_SECRET;

class UserController {
    static async createUser(req, res) {
        try {
          const user = await UserServices.createUser(req.body);
          if (user) {
            res.status(201).json(user);
          } else {
            res.status(500).json({ error: 'Failed to create user' });
          }
        } catch (error) {
            console.error('Error creating user:', error.message);
            if (error.message === 'Email already exists') {
              res.status(400).json({ error: 'Email already taken' });
            }else if (error.message === 'Phone already taken') {
                res.status(400).json({ error: 'Phone already taken' });
              }else if (error.message === 'Invalid code') {
                res.status(400).json({ error: 'Invalid code' });
              } else {
              res.status(500).json({ error: 'Failed to create user' });
            }
          }
      }
      

  static async getUserById(req, res) {
    try {
      const userId = req.params.id;
      const user = await UserServices.getUserById(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      console.error('Error retrieving user:', error);
      res.status(500).json({ error: 'Failed to retrieve user' });
    }
  }

  static async updateUser(req, res) {
    try {
      const userId = req.params.id;
      const updatedUser = await UserServices.updateUser(userId, req.body);
      console.log('ID :', userId);

      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(updatedUser);
    } catch (error) {
        console.error('Error creating user:', error.message);
        if (error.message === 'Email already exists') {
          res.status(400).json({ error: 'Email already taken' });
        }else if (error.message === 'Phone already taken') {
            res.status(400).json({ error: 'Phone already taken' });
          } else {
          res.status(500).json({ error: 'Failed to create user' });
        }
      }
  }

  static async deleteUser(req, res) {
    try {
      const result = await UserServices.deleteUser(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: error.message });
    }
  }
  

  // Add more controller methods as needed for user-related operations
}

module.exports = UserController;
