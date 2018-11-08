const express = require('express');
const Article = require('../models/article');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('', checkAuth, (req, res, next) => {
    const article = new Article({
      title: req.body.title,
      content: req.body.content
    });
    article.save().then(createdArticle => {
      res.status(201).json({
        message: 'Article added successfully',
        articleId: createdArticle._id
      });
    });
  });
  
  router.get('', (req, res, next) => {
    Article.find()
      .then(documents => {
        res.status(200).json({
          message: 'articles fetched successfully',
          articles: documents
        });
      });
  });
  
  router.delete('/:id', checkAuth, (req, res, next) => {
    Article.deleteOne({ _id: req.params.id })
      .then(() => {
        res.status(200).json({
          message: 'Article deleted successfully'
        });
      });
  });
  
  router.put('/:id', checkAuth, (req, res, next) => {
    Article.findByIdAndUpdate({ _id: req.params.id }, req.body).then(updatedArticle => {
      console.log(updatedArticle);
      res.status(201).json({
        message: 'Article updated successfully',
        articleId: updatedArticle._id
      });
    });
  });

  module.exports = router;