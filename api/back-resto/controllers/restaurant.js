const Restaurant = require('../models/restaurant');
const Article = require('../models/article');
const Menu = require('../models/menu');
const path = require('path');
//const uploadDir = '../public/uploads/images/';
//const fs = require('fs');

// Créer un restaurant
exports.createRestaurant = (req, res) => {
    const { name, description, restaurateur_id } = req.body;

    if (!req.file) {
        return res.status(400).json({ error: 'Photo is required' });
    }

    const photoName = req.file.filename;
    const userid = req.userid;

    const restaurant = new Restaurant({
        name,
        description,
        photo: photoName,
        restaurateur_id: userid,
    });

    restaurant
        .save()
        .then((createdRestaurant) => {
            res.status(201).json({ restaurant: createdRestaurant });
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

// Mettre à jour un restaurant par son ID
exports.updateRestaurantById = (req, res) => {
    const { name, description } = req.body;
    const { id } = req.params;

    Restaurant.findById(id)
        .then((restaurant) => {
            if (!restaurant) {
                return res.status(404).json({ error: 'Restaurant not found' });
            }

            // Vérifie si un fichier de photo est disponible
            if (req.file) {
                // Récupère le nom du fichier de la nouvelle photo
                const newPhotoName = req.file.filename;
                // Supprime l'ancienne photo du système de fichiers
                fs.unlinkSync(
                    path.join(__dirname, '../public/uploads/images', restaurant.photo)
                );
                // Met à jour le nom de la photo avec le nouveau nom de fichier
                restaurant.photo = newPhotoName;
            }

            // Met à jour les autres champs du restaurant
            restaurant.name = name;
            restaurant.description = description;

            return restaurant.save();
        })
        .then((updatedRestaurant) => {
            return res.json({ restaurant: updatedRestaurant });
        })
        .catch((error) => {
            return res.status(400).json({ error });
        });
};
exports.getRestaurantById = (req, res) => {
    const { id } = req.params;

    Restaurant.findById(id)
        .then((restaurant) => {
            if (!restaurant) {
                return res.status(404).json({ message: 'Restaurant not found' });
            }
            res.status(200).json({ restaurant });
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};


// Get all restaurants
exports.getAllRestaurants = (req, res) => {
    Restaurant.find()
        .then((restaurants) => {
            res.status(200).json({ restaurants });
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

// Delete a restaurant by ID
exports.deleteRestaurantById = (req, res) => {
    const { id } = req.params;

    Restaurant.findByIdAndRemove(id)
        .then(async (restaurant) => {
            if (!restaurant) {
                return res.status(404).json({ message: 'Restaurant not found' });
            }

            // Supprimer l'image associée au restaurant
            // const imagePath = path.join(uploadDir, restaurant.photo);
            // fs.unlinkSync(imagePath);

            await Article.deleteMany({ restaurant_id: id });
            await Menu.deleteMany({ restaurant_id: id });

            res.status(200).json({ message: 'Restaurant deleted successfully' });
        })
        .catch((error) => {
            console.error('Error deleting restaurant:', error);
            res.status(400).json({ error });
        });
};