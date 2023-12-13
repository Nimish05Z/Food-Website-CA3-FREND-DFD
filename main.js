function fetchRandomMeal() {
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(response => response.json())
    .then(data => {
      const meal = data.meals[0];
      const mealImageURL = meal.strMealThumb;
      const mealName = meal.strMeal;

      // Displays random meal images
      document.getElementById('randomMeal').innerHTML = `
        <img src="${mealImageURL}" alt="Meal's Image">
        <p>${mealName}</p>
      `;

      // Setting up modal for ingredients
      const modal = document.getElementById('mealModal');
      const closeBtn = document.querySelector('.close');

      document.getElementById('randomMeal').addEventListener('click', () => {
        const ingredients = getIngredients(meal);
        displayIngredients(ingredients);
        modal.style.display = 'block';
      });

      closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });

      window.addEventListener('click', (event) => {
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      });
    })
    .catch(error => {
      console.error('Error fetching random meal:', error);
    });
}

// Function to get meal ingredients
function getIngredients(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient) {
      ingredients.push(ingredient);
    } else {
      break;
    }
  }
  return ingredients;
}

// Displaying meal ingredients in the modal
function displayIngredients(ingredients) {
  const ingredientList = document.getElementById('mealIngredients');
  ingredientList.innerHTML = '';
  ingredients.forEach(ingredient => {
    const listItem = document.createElement('li');
    listItem.textContent = ingredient;
    ingredientList.appendChild(listItem);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetchRandomMeal();
});

function searchByCategory() {
  const userInput = document.getElementById('categoryInput').value;
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${userInput}`)
    .then(response => response.json())
    .then(data => displaySearchedMealImages(data.meals))
    .catch(error => {
      console.error('Error fetching meal images:', error);
    });
}

// Function to create a meal item
function createMealItem(meal) {
  const mealDiv = document.createElement('div');
  mealDiv.classList.add('meal-item');

  const mealImage = document.createElement('img');
  mealImage.src = meal.strMealThumb;
  mealImage.alt = meal.strMeal;

  const mealName = document.createElement('p');
  mealName.textContent = meal.strMeal;
  mealName.style.marginTop = '10px';

  mealDiv.appendChild(mealImage);
  mealDiv.appendChild(mealName);

  return mealDiv;
}

// Function to display searched meal images and names below
function displaySearchedMealImages(meals) {
  const searchedMealContainer = document.getElementById('searchedMealContainer');
  searchedMealContainer.innerHTML = '';

  if (meals && meals.length > 0) {
    meals.forEach(meal => {
      const mealDiv = createMealItem(meal);
      searchedMealContainer.appendChild(mealDiv);
    });
  } else {
    searchedMealContainer.innerHTML = 'No meal images found for this category.';
  }
}
