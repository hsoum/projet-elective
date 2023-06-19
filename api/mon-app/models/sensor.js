const mongoose = require('mongoose');

// Define the schema for the sensor data
const sensorSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  datas: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
});

// Create the Sensor model
const Sensor = mongoose.model('Sensor', sensorSchema);

module.exports = Sensor;
