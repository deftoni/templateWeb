const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  img_irl: { type: String, required: false }
});

module.exports = mongoose.model('Article', articleSchema);
