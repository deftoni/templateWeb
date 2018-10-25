const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader(
    'Access-Control-Allow-Headers',
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post('/api/articles', (req, res, next ) => {
  const article = req.body;
  console.log(article);
  res.status(201).json({
    message: 'Article added successfully'
  });
});

app.get('/api/articles' , (req, res, next ) => {
  const articles = [
    {
      id: '213',
      title: 'first server side article',
      content: 'this is coming from the server'
    },
    {
      id: '241',
      title: 'second server side article',
      content: 'this is coming from the server too'
    },
    {
      id: '249',
      title: 'third server side article',
      content: 'this is coming from the server feels good !'
    }

  ];
  res.status(200).json({
    message: 'articles fetched successfully',
    articles: articles
  });
});

module.exports = app;
