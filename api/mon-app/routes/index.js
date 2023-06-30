var express = require('express');
var router = express.Router();
const authenticateToken = require('../Middleware/authMiddleware');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

const sensors = [
  {id:1, type:'alpha', datas:[1,2,3]},
  {id:2, type:'beta', datas:[1,2,3], metrics:false},
   {id:3, type:'omega', datas:{a:1,b:2}},
]
const Sensor = require('../models/sensor'); // Assuming you have a Sensor model defined


// GET route pour récupérer les données d'un capteur spécifique
router.get('/sensors/:id', async (req, res) => {
  const sensorId = parseInt(req.params.id);
  
  try {
    const sensor = await Sensor.findOne({ id: sensorId }).exec();

    if (sensor) {
      res.json(sensor);
    } else {
      res.status(404).json({ response: 'Capteur non trouvé' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ response: 'Une erreur est survenue lors de la récupération du capteur' });
  }
});



// POST route pour ajouter un capteur


router.post('/sensors', async (req, res) => {
  const { id, type, datas } = req.body;

  

  try {
    const sensor = new Sensor({
      id,
      type,
      datas
    });

    await sensor.save();
    res.status(201).json({ response: 'Capteur ajouté' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ response: 'Une erreur est survenue lors de l\'ajout du capteur' });
  }
});





// PUT route pour modifier les données d'un capteur
router.put('/sensors/:id', (req, res) => {
  const sensorId = parseInt(req.params.id);
  const sensor = sensors.find(sensor => sensor.id === sensorId);

  if (sensor) {
    // Le capteur existe, mettre à jour les données
    Object.assign(sensor.datas, req.body);

    res.json({ response: "Données du capteur mises à jour" });
  } else {
    // Le capteur n'existe pas
    res.status(404).json({ response: "Capteur non trouvé" });
  }
});

//commande route

const orderController = require('../controllers/orderController');

// Route for creating a new food order
router.post('/orders',authenticateToken, orderController.createOrder);
// Route for editing an existing food order
router.put('/orders/:orderId',authenticateToken, orderController.editOrder);
//get all orders 
router.get('/orders', authenticateToken, orderController.getAllOrders);
