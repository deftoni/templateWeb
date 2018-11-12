const express = require('express');
const Article = require('../models/article');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('', checkAuth, (req, res, next) => {
  const article = new Article({
    title: req.body.title,
    content: req.body.content,
    img_irl: req.body.img_irl
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

router.post('/upload', function (req, res) {

  if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.myFile;
  console.log('this is my sampleFile: ', sampleFile.name);
  // Use the mv() method to place the file somewhere on your server
  const myFILENAME = sampleFile.name;
  sampleFile.mv('../server/ressources/article/img/' + myFILENAME, function (err) {
    if (err)
      return res.status(500).send('na pas pu etre enregistre sur le ftp' + err);
  });
});

module.exports = router;