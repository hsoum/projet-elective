const Article = require('../models/article')
const resto = require('../models/restaurant')

const article = require('../models/article');
const Menu = require('../models/menu');


exports.getAllArticles = (req, res) => {
    const { restaurant_id } = req.body;
    
    Promise.all([
        Article.find({ restaurant_id }).populate('restaurant_id'),
        Menu.find({ restaurant_id }).populate('restaurant_id')
    ])
        .then(([articles, menus]) => {
            return res.status(200).json({ articles, menus });
        })
        .catch((error) => {
            return res.status(400).json({ error });
        });
};







