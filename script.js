document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('predictionForm');
    const predictionMessage = document.getElementById('predictionMessage');
    const recipeList = document.getElementById('recipeList');
    const foodTypeSelect = document.getElementById('foodType');
    const specificFoodSelect = document.getElementById('specificFood');

    // Load food types
    async function loadFoodTypes() {
        try {
            const response = await fetch('http://localhost:5000/food-types');
            if (!response.ok) {
                throw new Error('Failed to load food types');
            }
            const foodTypes = await response.json();
            
            // Populate food type dropdown
            foodTypeSelect.innerHTML = '<option value="">Select a category</option>';
            Object.entries(foodTypes).forEach(([key, value]) => {
                const option = document.createElement('option');
                option.value = key;
                option.textContent = value.name;
                foodTypeSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error loading food types:', error);
            foodTypeSelect.innerHTML = '<option value="">Error loading categories</option>';
        }
    }

    // Update specific food options when food type changes
    foodTypeSelect.addEventListener('change', async () => {
        try {
            const response = await fetch('http://localhost:5000/food-types');
            if (!response.ok) {
                throw new Error('Failed to load food types');
            }
            const foodTypes = await response.json();
            const selectedType = foodTypeSelect.value;
            
            if (selectedType) {
                const items = foodTypes[selectedType].items;
                specificFoodSelect.innerHTML = '<option value="">Select a food item</option>';
                items.forEach(item => {
                    const option = document.createElement('option');
                    option.value = item;
                    option.textContent = item;
                    specificFoodSelect.appendChild(option);
                });
            } else {
                specificFoodSelect.innerHTML = '<option value="">Select a food item</option>';
            }
        } catch (error) {
            console.error('Error loading specific foods:', error);
            specificFoodSelect.innerHTML = '<option value="">Error loading food items</option>';
        }
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = {
            temperature: document.getElementById('temperature').value,
            is_refrigerated: document.getElementById('is_refrigerated').value,
            is_sealed: document.getElementById('is_sealed').value
        };

        const foodType = document.getElementById('foodType').value;
        const specificFood = document.getElementById('specificFood').value;

        try {
            // Get prediction
            const predictionResponse = await fetch('http://localhost:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!predictionResponse.ok) {
                throw new Error('Prediction request failed');
            }

            const predictionData = await predictionResponse.json();

            // Update prediction message
            predictionMessage.textContent = `${predictionData.message} for ${specificFood}`;
            predictionMessage.className = `message ${predictionData.prediction === 1 ? 'high-risk' : 'low-risk'}`;

            // Get AI-generated recipe
            const recipesResponse = await fetch(`http://localhost:5000/recipes?type=${foodType}&food=${encodeURIComponent(specificFood)}`);
            if (!recipesResponse.ok) {
                throw new Error('Recipe generation failed');
            }

            const recipes = await recipesResponse.json();
            
            if (recipes.error) {
                throw new Error(recipes.error);
            }

            // Display recipe
            recipeList.innerHTML = recipes.map(recipe => `
                <div class="recipe-card">
                    <h3>${recipe.name}</h3>
                    <h4>Ingredients:</h4>
                    <ul>
                        ${Array.isArray(recipe.ingredients) ? 
                            recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('') :
                            '<li>No ingredients available</li>'}
                    </ul>
                    <h4>Instructions:</h4>
                    <ol>
                        ${Array.isArray(recipe.instructions) ? 
                            recipe.instructions.map(instruction => `<li>${instruction}</li>`).join('') :
                            '<li>No instructions available</li>'}
                    </ol>
                </div>
            `).join('');

        } catch (error) {
            console.error('Error:', error);
            predictionMessage.textContent = 'An error occurred. Please try again.';
            predictionMessage.className = 'message high-risk';
            recipeList.innerHTML = '<div class="error">Failed to generate recipe. Please try again.</div>';
        }
    });

    // Load food types when page loads
    loadFoodTypes();
}); 