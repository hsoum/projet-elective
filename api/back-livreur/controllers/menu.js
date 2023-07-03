const Menu = require('../models/menu');
const Article = require('../models/article');

exports.createMenu = (req, res) => {
    const { title, description, price, articleIds, restaurant_id } = req.body;

    // Assuming `articleIds` is an array of Article IDs
    const userid = req.userid;
    const menu = new Menu({
        title,
        description,
        price,
        articles: articleIds, // Store the array of Article IDs in the menu's `articles` field
        resto_id: userid,
        restaurant_id,
    });
    menu
        .save()
        .then((savedMenu) => {
            res.status(201).json({ menu: savedMenu });
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

exports.getMenuWithArticles = (req, res) => {
    const menuId = req.params.id;

    Menu.findById(menuId)
        .populate('articles') // Populate the `articles` field with actual Article objects
        .exec()
        .then((menu) => {
            if (!menu) {
                return res.status(404).json({ error: 'Menu not found' });
            }
            res.status(200).json({ menu });
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

exports.getAllMenus = (req, res) => {
    Menu.find()
        .populate('articles') // Populate the `articles` field with actual Article objects
        .exec()
        .then((menus) => {
            return res.status(200).json({ menus });
        })
        .catch((error) => {
            return res.status(400).json({ error });
        });
};

exports.updateMenu = (req, res) => {
    const menuId = req.params.id;
    const { title, description, price, articleIds } = req.body;

    Menu.findById(menuId)
        .then((menu) => {
            if (!menu) {
                return res.status(404).json({ error: 'Menu not found' });
            }

            // Update the menu fields
            menu.title = title;
            menu.description = description;
            menu.price = price;

            // Update the articles
            menu.articles = articleIds;

            return menu.save();
        })
        .then((updatedMenu) => {
            res.status(200).json({ menu: updatedMenu });
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};



// exports.updateMenuArticle = (req, res) => {
//     const menuId = req.params.id;
//     const articleId = req.params.articleId;
//     const newArticleId = req.body.newArticleId;

//     Menu.findById(menuId)
//         .then((menu) => {
//             if (!menu) {
//                 return res.status(404).json({ error: 'Menu not found' });
//             }

//             const articleIndex = menu.articles.findIndex((article) => article._id.toString() === articleId);
//             if (articleIndex === -1) {
//                 return res.status(404).json({ error: 'Article not found in the menu' });
//             }

//             // Replace Article 2 with the new article ID
//             menu.articles[articleIndex] = newArticleId;

//             return menu.save();
//         })
//         .then((updatedMenu) => {
//             res.status(200).json({ menu: updatedMenu });
//         })
//         .catch((error) => {
//             res.status(400).json({ error });
//         });
// };


exports.deleteMenu = (req, res) => {
    const menuId = req.params.id;

    Menu.findByIdAndDelete(menuId)
        .then((menu) => {
            if (!menu) {
                return res.status(404).json({ error: 'Menu not found' });
            }
            res.status(200).json({ message: 'Menu deleted successfully' });
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};