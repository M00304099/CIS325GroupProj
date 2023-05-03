const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/dish-manager', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const Dish = require('./dish');

// Retrieve all dishes from the database
app.get('/api/dishes', async (req, res) => {
  const dishes = await Dish.find();
  res.json(dishes);
});

// Add a new dish to the database
app.post('/api/dishes', async (req, res) => {
  const dish = new Dish(req.body);
  await dish.save();
  res.status(201).json(dish);
});

// Update dish information in the database
app.put('/api/dishes/:id', async (req, res) => {
  const id = req.params.id;
  const updatedDish = req.body;

  const dish = await Dish.findByIdAndUpdate(id, updatedDish, { new: true });

  if (dish) {
    res.status(200).json(dish);
  } else {
    res.status(404).json({ error: 'Dish not found' });
  }
});

// Retrieve dishes that have a certain ingredient
app.get('/api/dishes/ingredient/:ingredient', async (req, res) => {
  const ingredient = req.params.ingredient;
  const dishes = await Dish.find({ ingredients: ingredient });
  res.json(dishes);
});

// Retrieve dishes of a certain type
app.get('/api/dishes/type/:type', async (req, res) => {
  const type = req.params.type;
  const dishes = await Dish.find({ type: type });
  res.json(dishes);
});

// Retrieve a dish by name
app.get('/api/dishes/name/:name', async (req, res) => {
  const name = req.params.name;
  const dish = await Dish.findOne({ name: name });

  if (dish) {
    res.json(dish);
  } else {
    res.status(404).json({ error: 'Dish not found' });
  }
});