fetch('http://localhost:5000/api/dishes')
    .then((response) => response.json())
    .then((dishes) => {
        // Display the dishes
    })
    .catch((error) => {
        console.error('Error fetching dishes:', error);
    });