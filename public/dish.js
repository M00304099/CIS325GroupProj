const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  name: String,
  image: String,
  type: String,
  ingredients: [String],
});

const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;