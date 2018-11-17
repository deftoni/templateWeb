const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileUpload = require('../../templateWeb/node_modules/express-fileupload');
const userRoutes = require('./routes/user');
const articlesRoutes = require('./routes/articles');

const app = express();

mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb+srv://AngularNode:N8qqeeZPwYf1QBn9@cluster0-g1zec.gcp.mongodb.net/templateWebDB', { useNewUrlParser: true })

  .then(() => {
    console.log('Connected to dataBase !');
  })
  .catch(() => {
    console.log('Connection failed !');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(fileUpload());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader(
    'Access-Control-Allow-Headers',
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use('/images', express.static(path.join('../server/backend/public/images')));
app.use('/api/articles', articlesRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
