const Restaurant = require('../models/restaurant');
const Article = require('../models/article');
const Menu = require('../models/menu');
const path = require('path');
//const uploadDir = '../public/uploads/images/';
//const fs = require('fs');

// Créer un restaurant
exports.createRestaurant = (req, res) => {
    const { name, description, restaurateur_id,longitude,latitude,phoneNumber } = req.body;

    if (!req.file) {
        return res.status(400).json({ error: 'Photo is required' });
    }

    const photoName = req.file.filename;
    const userid = req.userid;

    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    


    const restaurant = new Restaurant({
        name,
        description,
        photo: photoName,
        restaurateur_id: userid,
        latitude,
        longitude,
        createdAt:new Date(),
        phoneNumber
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
    const { name, description,phoneNumber } = req.body;
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
            restaurant.phoneNumber = phoneNumber;

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
    const { longitude, latitude } = req.body;
    Restaurant.find()
      .then((restaurants) => {
        // Calculate distance for each restaurant and add it as a property
        const restaurantsWithDistance = restaurants.map((restaurant) => {
          const distance = calculateDistance(
            latitude,
            longitude,
            restaurant.latitude,
            restaurant.longitude
          );
          return { restaurant, distance };
        });
  
        // Sort restaurants by distance in ascending order
        restaurantsWithDistance.sort((a, b) => a.distance - b.distance);
  
        // Extract restaurants without distance information
        const sortedRestaurants = restaurantsWithDistance.map((restaurantWithDistance) => restaurantWithDistance.restaurant);
  
        res.status(200).json({ restaurants: sortedRestaurants });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  };
  
  // Function to calculate distance using Haversine formula
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = R * c;
    return distance;
  }
  
  // Function to convert degrees to radians
  function toRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }
  
  

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

// get new restarants
exports.getNewRestaurants = (req, res) => {
    const { longitude, latitude } = req.body;
    Restaurant.find()
      .then((restaurants) => {
        // Calculate distance for each restaurant and add it as a property
        const restaurantsWithDistance = restaurants.map((restaurant) => {
          const distance = calculateDistance(
            latitude,
            longitude,
            restaurant.latitude,
            restaurant.longitude
          );
          return { restaurant, distance };
        });
  
        // Sort restaurants by distance in ascending order
        restaurantsWithDistance.sort((a, b) => a.distance - b.distance);
  
        // Extract restaurants without distance information
        const sortedRestaurants = restaurantsWithDistance.map((restaurantWithDistance) => restaurantWithDistance.restaurant);
  
        // Sort restaurants by createdAt in descending order (most recent first)
        sortedRestaurants.sort((a, b) => b.createdAt - a.createdAt);
  
        // Get the ten most recent restaurants
        const recentRestaurants = sortedRestaurants.slice(0, 10);
  
        res.status(200).json({ restaurants: recentRestaurants });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  };
  