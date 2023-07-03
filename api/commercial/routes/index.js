var express = require('express');
var router = express.Router();
const authenticateToken = require('../Middleware/authMiddleware');
const commController = require('../controllers/commController');

router.get('/orders', authenticateToken, commController.getAllOrders);

router.get('/clients', authenticateToken, commController.getAllClients);
// router.put('/toggleSuspension/:id', commController.toggleSuspension);

// Route pour afficher les données d'un client par son ID
router.get('/client/:id', commController.getClientById);

// Route pour mettre à jour les données d'un client par son ID
router.put('/client/:id', commController.updateUser);

module.exports = router;
