const dishesContainer = document.getElementById('dishes-container');
const addDishForm = document.getElementById('add-dish-form');
const API_BASE_URL = 'http://localhost:5000';

async function fetchDishes() {
  const res = await fetch('http://localhost:5000/api/dishes');
  const dishes = await res.json();

  if (Array.isArray(dishes)) {
    displayDishes(dishes);
  } else {
    console.error("Error fetching dishes:", dishes);
  }
}

function displayDishes(dishes) {
  dishesContainer.innerHTML = '';

  for (const dish of dishes) {
    const dishCard = document.createElement('div');
    dishCard.innerHTML = `
      <h3>${dish.name}</h3>
      <img src="${dish.image}" alt="${dish.name}" />
      <p>Type: ${dish.type}</p>
      <p>Ingredients: ${dish.ingredients.join(', ')}</p>
      <button onclick="removeDish('${dish._id}')">Remove Dish</button>
    `;
    dishesContainer.appendChild(dishCard);
  }
}

addDishForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const image = document.getElementById('image').value;
  const type = document.getElementById('type').value;
  const ingredients = document.getElementById('ingredients').value.split(',');

  const dish = { name, image, type, ingredients };

  const res = await fetch('http://localhost:5000/api/dishes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dish),
  });

  if (res.ok) {
    fetchDishes();
    addDishForm.reset();
  } else {
    // Add error logging here
    const error = await res.json();
    console.error("Error adding dish:", error.message);
    alert('Error adding dish');
  }
});

const getDishByNameForm = document.getElementById('get-dish-by-name-form');

getDishByNameForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name-search').value;
  const res = await fetch(`http://localhost:5000/api/dishes/name/${name}`);

  if (res.ok) {
    const dish = await res.json();
    displayDishes([dish]);
  } else {
    alert('Error retrieving dish by name');
  }
});

const getDishByIngredientForm = document.getElementById('get-dish-by-ingredient-form');
getDishByIngredientForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const ingredient = document.getElementById('ingredient').value;

  const res = await fetch(`${API_BASE_URL}/api/dishes/ingredient/${ingredient}`);
  const dishes = await res.json();
  displayDishes(dishes);
  getDishByIngredientForm.reset();
});

const getDishByTypeForm = document.getElementById('get-dish-by-type-form');
getDishByTypeForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const type = document.getElementById('get-type').value;

  const res = await fetch(`${API_BASE_URL}/api/dishes/type/${type}`);
  const dishes = await res.json();
  displayDishes(dishes);
  getDishByTypeForm.reset();
});

const getDishByNameForm = document.getElementById('get-dish-by-name-form');
getDishByNameForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('get-name').value;

  const res = await fetch(`${API_BASE_URL}/api/dishes/name/${name}`);
  const dish = await res.json();
  displayDishes([dish]);
  getDishByNameForm.reset();
});

async function removeDish(id) {
  const res = await fetch(`${API_BASE_URL}/api/dishes/${id}`, {
    method: 'DELETE',
  });

  if (res.ok) {
    fetchDishes();
  } else {
    alert('Error removing dish');
  }
}

fetchDishes();