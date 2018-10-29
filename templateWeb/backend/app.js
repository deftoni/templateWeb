const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Article = require('./models/article');

const app = express();

mongoose.connect('mongodb+srv://mush:8mpRcH61LWu31rPG@cluster0-g1zec.gcp.mongodb.net/templateWebDB?retryWrites=true')
  .then(() => {
    console.log('Connected to dataBase !');
  })
  .catch(() => {
    console.log('Connection failed !')
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader(
    'Access-Control-Allow-Headers',
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post('/api/articles', (req, res, next) => {
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

app.get('/api/articles', (req, res, next) => {
  Article.find()
    .then(documents => {
      res.status(200).json({
        message: 'articles fetched successfully',
        articles: documents
      });
    });
});

app.delete('/api/articles/:id', (req, res, next) => {
  Article.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: 'Article deleted successfully'
      });
    });
});

app.put('/api/articles/:id', (req, res, next) => {
  Article.findByIdAndUpdate({ _id: req.params.id }, req.body).then(updatedArticle => {
    res.status(201).json({
      message: 'Article updated successfully',
      articleId: updatedArticle._id
    });
  });
});

module.exports = app;
