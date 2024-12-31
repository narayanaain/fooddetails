const mongoose = require('mongoose');

const mealItemSchema = new mongoose.Schema({
  name: String,
  image: String,
  calories: Number,
  quantity: String
});

const mealSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner', 'snacks']
  },
  items: [mealItemSchema],
  totalCalories: Number
});

module.exports = mongoose.model('Meal', mealSchema); 