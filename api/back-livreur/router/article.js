const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/article');

const authenticateToken = require('../Middleware/authMiddleware');
const upload = require('../Middleware/upload');


router.post('/', authenticateToken, upload.single('photo'), ArticleController.createArticle);
router.get('/:id', authenticateToken, ArticleController.getOneArticle);
router.get('/', authenticateToken, ArticleController.getAllArticles);
router.put('/:id', authenticateToken, upload.single('photo'), ArticleController.updateArticle);
router.delete('/:id', authenticateToken, ArticleController.deleteArticle);

module.exports = router;    