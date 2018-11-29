const express = require('express');
const router = express.Router();

var contactController = require('../controllers/contact.controller');

//routes
router.post('', contactController.sendEmail);
module.exports = router;