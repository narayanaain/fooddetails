const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  image: String,
  title: String,
  category: String,
  calories: Number,
  benefits: String
});

module.exports = mongoose.model('Food', foodSchema); 