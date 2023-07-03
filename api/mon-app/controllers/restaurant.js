const Restaurant = require('../models/restaurant');
const Article = require('../models/article');
const Menu = require('../models/menu');
const path = require('path');




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
  