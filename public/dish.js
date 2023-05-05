const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  type: { type: String, required: true },
  ingredients: { type: [String], required: true },
});

module.exports = mongoose.model('Dish', dishSchema);