const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/your_database_name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// API routes will be defined here

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const Dish = require('./Dish');

// Get all dishes
app.get('/api/dishes', async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.json(dishes);
  } catch (err) {
    res.status(500).json({ message: 'Error:', error: err, stack: err.stack });
  }
});

// Add a dish
app.post('/api/dishes', async (req, res) => {
  const { name, image, type, ingredients } = req.body;
  const dish = new Dish({ name, image, type, ingredients });

  try {
    await dish.save();
    res.status(201).json(dish);
  } catch (err) {
    res.status(500).json({ message: 'Error:', error: err, stack: err.stack });
  }
});

// Update a dish
app.put('/api/dishes/:id', async (req, res) => {
  const { id } = req.params;
  const { name, image, type, ingredients } = req.body;

  try {
    const updatedDish = await Dish.findByIdAndUpdate(id, { name, image, type, ingredients }, { new: true });
    res.json(updatedDish);
  } catch (err) {
    res.status(500).json({ message: 'Error:', error: err, stack: err.stack });
  }
});

// Get dishes with a specific ingredient
app.get('/api/dishes/ingredient/:ingredient', async (req, res) => {
  const { ingredient } = req.params;
  try {
    const dishes = await Dish.find({ ingredients: ingredient });
    res.json(dishes);
  } catch (err) {
    res.status(500).json({ message: 'Error:', error: err, stack: err.stack });
  }
});

// Get dishes of a specific type
app.get('/api/dishes/type/:type', async (req, res) => {
  const { type } = req.params;
  try {
    const dishes = await Dish.find({ type });
    res.json(dishes);
  } catch (err) {
res.status(500).json({ message: 'Error:', error: err, stack: err.stack });
}
});

app.delete('/api/dishes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Dish.findByIdAndDelete(id);
    res.json({ message: 'Dish deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error:', error: err, stack: err.stack });
  }
});

// Get a dish by name
app.get('/api/dishes/name/:name', async (req, res) => {
const { name } = req.params;
try {
const dish = await Dish.findOne({ name });
res.json(dish);
} catch (err) {
res.status(500).json({ message: 'Error:', error: err, stack: err.stack });
}
});