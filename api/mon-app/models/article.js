const mongoose = require("mongoose");

const article = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    type: {
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
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    }
});

module.exports = mongoose.model('Article', article);