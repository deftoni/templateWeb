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