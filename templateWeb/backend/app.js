const express = require('express');
const app = express();

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

app.use('/api/articles' , (req, res, next ) => {
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
    }

  ];
  res.status(200).json({
    message: 'articles fetched succesfully',
    articles: articles
  });
});

module.exports = app;
