const { Client } = require('../models/User');
const Restaurant = require('../models/restaurant');
const Article = require('../models/article');
const Menu = require('../models/menu');
const bcrypt = require('bcryptjs');

class UserServices {
  static async createUser(userData) {
    try {
      const { email, password, FirstName, LastName, username, birthDate, phoneNumber } = userData;

      // Check if email already exists
      const existingUser = await Client.findOne({ where: { email } });
      if (existingUser) {
        throw new Error('Email already exists');
      }
      // Check if email already exists
      const existingUserPhone = await Client.findOne({ where: { phoneNumber } });
      if (existingUserPhone) {
        throw new Error('Phone already taken');
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await Client.create({
        email,
        password: hashedPassword,
        FirstName,
        LastName,
        username,
        birthDate,
        phoneNumber,
        Role: 'livreur'
      });

      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  static async getUserById(userId) {
    try {
      const user = await Client.findByPk(userId);
      return user;
    } catch (error) {
      console.error('Error retrieving user:', error);
      throw error;
    }
  }

  static async updateUser(userId, userData) {
    try {
      const user = await Client.findByPk(userId);

      // validate
      const usermailChanged = userData.email && user.email !== userData.email;
      if (usermailChanged && await Client.findOne({ where: { email: userData.email } })) {
        throw new Error('Email already exists');

      }

      const userphoneChanged = userData.phoneNumber && user.phoneNumber !== userData.phoneNumber;
      if (userphoneChanged && await Client.findOne({ where: { phoneNumber: userData.phoneNumber } })) {
        throw new Error('Phone already taken');

      }

      // Update the user
      await Client.update(userData, { where: { id: userId } });

      // Fetch the updated user
      const updatedUser = await Client.findByPk(userId);
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }


  static async deleteUser(userId) {
    try {
      // Find all restaurants associated with the user
      const restaurants = await Restaurant.find({ restaurateur_id: userId });

      // Get all restaurant IDs
      const restaurantIds = restaurants.map(restaurant => restaurant._id);

      // Delete all articles associated with the user's restaurants
      await Article.deleteMany({ restaurant_id: { $in: restaurantIds } });

      // Delete all menus associated with the user's restaurants
      await Menu.deleteMany({ restaurant_id: { $in: restaurantIds } });

      // Delete all restaurants associated with the user
      await Restaurant.deleteMany({ restaurateur_id: userId });

      // Delete the user
      const deletedUser = await Client.destroy({ where: { id: userId } });
      if (deletedUser) {
        return { success: true };
      } else {
        return { success: false, error: 'User not found' };
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }


  // Add more methods as needed for user-related operations
}

module.exports = UserServices;