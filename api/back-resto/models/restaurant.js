const mongoose = require("mongoose");

const restaurant = mongoose.Schema({
    name: {
        type: String,
        required: true,
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
    }
});

module.exports = mongoose.model('Restaurant', restaurant);