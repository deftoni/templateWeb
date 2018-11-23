const express = require('express');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

var articlesController = require('../controllers/articles.controller');

//routes
router.post('', checkAuth, articlesController.create);
router.get('', articlesController.getArticles);
router.delete('/:id', checkAuth, articlesController.deleteArticle);
router.put('/:id', checkAuth, articlesController.updateArticle);
router.get('/:id', articlesController.getArticleById);
module.exports = router;