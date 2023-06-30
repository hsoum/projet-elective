const express = require('express');
const router = express.Router();
const MenuController = require('../controllers/menu');
const authenticateToken = require('../Middleware/authMiddleware');

router.post('/', authenticateToken, MenuController.createMenu);
router.get('/', authenticateToken, MenuController.getAllMenus);
router.get('/:id', authenticateToken, MenuController.getMenuWithArticles);
router.put('/:id', authenticateToken, MenuController.updateMenu);
router.delete('/:id', authenticateToken, MenuController.deleteMenu);
//router.put('/:id/articles/:articleId', MenuController.updateMenuArticle);

module.exports = router;