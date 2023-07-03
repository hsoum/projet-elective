const FoodOrder = require('../models/order');
const Article = require('../models/article');
const Menu = require('../models/menu');
const { Client } = require('../models/User');
const bcrypt = require('bcryptjs');

// Find all orders and populate the articles and menus
const getAllOrders = async (req, res) => {
  try {
    // Find all orders and populate the articles and menus
    const orders = await FoodOrder.find()
      .populate('articles')
      .populate({
        path: 'menus',
        populate: {
          path: 'articles',
          model: 'Article'
        }
      });

    // Count total orders
    const totalOrders = orders.length;

    // Count orders where isDelivered is false
    const pendingOrders = orders.filter(order => !order.isDelivered).length;

    // Count orders where isDelivered is true
    const deliveredOrders = orders.filter(order => order.isDelivered).length;

    console.log(orders);
    res.json({ orders, totalOrders, pendingOrders, deliveredOrders });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve orders', error: error.message });
  }
};


// Fonction pour afficher les données d'un client par son ID
const getClientById = (req, res) => {
  const clientId = req.params.id; // Récupérer l'ID du client à partir des paramètres de la requête

  // Utiliser la méthode findById pour trouver le client par son ID
  Client.findByPk(clientId)
    .then((client) => {
      if (!client) {
        // Si aucun client n'est trouvé, renvoyer une réponse avec un code 404 (Not Found)
        return res.status(404).json({ message: 'Client not found' });
      }
      // Si le client est trouvé, renvoyer les données du client dans la réponse
      res.json(client);
    })
    .catch((error) => {
      // En cas d'erreur, renvoyer une réponse avec un code 500 (Internal Server Error) et l'erreur associée
      res.status(500).json({ message: 'Error retrieving client', error: error.message });
    });
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = req.body;

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
    const updatedData = {};
    if (usermailChanged) {
      updatedData.email = userData.email;
    }
    if (userphoneChanged) {
      updatedData.phoneNumber = userData.phoneNumber;
    }
    if (userData.password.trim() !== '') {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      updatedData.password = hashedPassword;
    } else {
      updatedData.password = user.password; // Keep the existing password
    }

    updatedData.FirstName = userData.FirstName;
    updatedData.LastName = userData.LastName;
    updatedData.username = userData.username;
    updatedData.isSuspended = userData.isSuspended;
    await Client.update(updatedData, { where: { id: userId } });

    // Fetch the updated user
    const updatedUser = await Client.findByPk(userId);
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error.message);
    if (error.message === 'Email already exists') {
      res.status(400).json({ error: 'Email already taken' });
    } else if (error.message === 'Phone already taken') {
      res.status(400).json({ error: 'Phone already taken' });
    } else {
      res.status(500).json({ error: 'Failed to update user' });
    }
  }
};



// const toggleSuspension = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     // Trouver le client correspondant à l'ID
//     const client = await Client.findByPk(id);

//     if (client) {
//       // Inverser la valeur de isSuspended
//       const updatedIsSuspended = !client.isSuspended;

//       // Mettre à jour le champ isSuspended du client
//       await client.update({ isSuspended: updatedIsSuspended });

//       // Envoyer une réponse indiquant que la mise à jour a été effectuée
//       res.json({ success: true, message: 'Mise à jour effectuée' });
//     } else {
//       // Le client n'a pas été trouvé
//       res.status(404).json({ success: false, message: 'Client non trouvé' });
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ success: false, message: 'Erreur lors de la mise à jour' });
//   }
// };


const getAllClients = async (req, res) => {
    try {
      const clients = await Client.findAll({
        where: {
          Role: 'Client'
        }
      });
     
      res.json( clients );
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

module.exports = { getAllOrders , getAllClients, getClientById,updateUser };