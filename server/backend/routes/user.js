const express = require('express');
const router = express.Router();

var userController = require('../controllers/users.controller');

//routes
router.post('/signup', userController.signup);
router.post('/login', userController.login);

module.exports = router;