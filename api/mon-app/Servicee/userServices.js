const { Client } = require('../models/User');
const bcrypt = require('bcrypt');

class UserServices {
    static async createUser(userData) {
      try {
        const { email, password, FirstName, LastName, username, birthDate, phoneNumber,codeParrainage } = userData;

        //generate code
        let code;
        let existingUserCode;

        do {
          // Generate a random string
           code = await UserServices.generateRandomCode(7);

          // Check if code already exists
          existingUserCode = await Client.findOne({ where: { codeParrainage:code } });
        } while (existingUserCode);
  
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
        const userBycode = await Client.findOne({ where: { codeParrainage } });
        // Throw error if code is not empty and user is not found
        if (codeParrainage && !userBycode) {
          throw new Error('Invalid code');
        }
        const user = await Client.create({
          email,
          password: hashedPassword,
          FirstName,
          LastName,
          username,
          birthDate,
          phoneNumber,
          Role:'Client',
          codeParrainage:code,
          parrainageId: userBycode ? userBycode.id : null
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
    
  
    // random code
    static async generateRandomCode(length) {
      let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
    }
  }
  
  module.exports = UserServices;
