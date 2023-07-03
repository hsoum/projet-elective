const mongoose = require("mongoose");

const restaurant = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    photo: {
        type: String, // Champ pour le nom du fichier de la photo
        required: true,
    },
    restaurateur_id: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    latitude: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: false
      },
      
    phoneNumber: {
        type:String,
        required:false,
        unique: true,
      }
});

module.exports = mongoose.model('Restaurant', restaurant);