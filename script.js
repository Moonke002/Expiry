// main food database containing all categories and their items
// each category has a display name and an array of specific food items
const FOOD_TYPES = {
    "vegetables": { "name": "Vegetables", "items": ["Carrots", "Broccoli", "Lettuce", "Tomatoes", "Bell Peppers", "Onions", "Spinach", "Kale", "Cucumber", "Zucchini", "Mushrooms", "Cauliflower"] },
    "fruits": { "name": "Fruits", "items": ["Apples", "Bananas", "Oranges", "Berries", "Grapes", "Avocados", "Mangoes", "Pineapple", "Peaches", "Pears", "Watermelon", "Kiwi"] },
    "meat": { "name": "Meat & Seafood", "items": ["Chicken", "Beef", "Pork", "Fish", "Turkey", "Lamb", "Shrimp", "Salmon", "Tuna", "Ground Beef", "Sausage", "Bacon"] },
    "dairy": { "name": "Dairy & Eggs", "items": ["Milk", "Cheese", "Yogurt", "Butter", "Cream", "Ice Cream", "Eggs", "Sour Cream", "Cottage Cheese", "Whipped Cream", "Greek Yogurt", "Heavy Cream"] },
    "pantry": { "name": "Pantry Items", "items": ["Rice", "Pasta", "Canned Goods", "Dried Beans", "Nuts", "Flour", "Oats", "Cereal", "Dried Fruits", "Spices", "Oil", "Vinegar"] },
    "baked_goods": { "name": "Baked Goods", "items": ["Bread", "Muffins", "Cookies", "Cake", "Pie", "Croissants", "Bagels", "Donuts", "Scones", "Brownies", "Pizza Dough", "Tortillas"] },
    "snacks": { "name": "Snacks", "items": ["Chips", "Popcorn", "Crackers", "Nuts", "Dried Fruits", "Granola Bars", "Pretzels", "Trail Mix", "Cookies", "Fruit Snacks", "Jerky", "Cheese Puffs"] }
};

// storage recommendations for each food category
// includes refrigeration advice, ideal temperature, packaging suggestions, and additional tips
const STORAGE_TIPS = {
    vegetables: { refrigeration: "Store in the crisper drawer", temperature: "32-40°F", packaging: "Use perforated plastic bags or containers", tips: "Keep away from ethylene-producing fruits, remove any damaged parts" },
    fruits: { refrigeration: "Most fruits should be refrigerated after ripening", temperature: "32-40°F", packaging: "Use breathable containers or bags", tips: "Some fruits like bananas and avocados should ripen at room temperature first" },
    meat: { refrigeration: "Always refrigerate or freeze", temperature: "32-40°F", packaging: "Use airtight containers or vacuum-sealed bags", tips: "Keep raw meat on the bottom shelf to prevent cross-contamination" },
    dairy: { refrigeration: "Always refrigerate", temperature: "32-40°F", packaging: "Keep in original packaging", tips: "Store away from strong-smelling foods" },
    pantry: { refrigeration: "Most items can be stored at room temperature", temperature: "50-70°F", packaging: "Use airtight containers", tips: "Keep in a cool, dark, dry place" },
    baked_goods: { refrigeration: "Most items can be stored at room temperature", temperature: "50-70°F", packaging: "Use airtight containers or bags", tips: "Freeze for longer storage" },
    snacks: { refrigeration: "Most items can be stored at room temperature", temperature: "50-70°F", packaging: "Keep in original packaging or airtight containers", tips: "Store away from direct sunlight" }
};

// estimated shelf life in days for each food category
// separate estimates for refrigerated and room temperature storage
const SHELF_LIFE = {
    vegetables: { refrigerated: 7, room_temp: 3 },
    fruits: { refrigerated: 5, room_temp: 2 },
    meat: { refrigerated: 3, room_temp: 1 },
    dairy: { refrigerated: 7, room_temp: 1 },
    pantry: { refrigerated: 30, room_temp: 30 },
    baked_goods: { refrigerated: 7, room_temp: 3 },
    snacks: { refrigerated: 14, room_temp: 7 }
};

// prediction function to determine spoilage risk based on storage conditions
// returns 1 for high risk, 0 for low risk
function predictSpoilage(temperature, isRefrigerated, isSealed) {
    // high risk conditions
    if (temperature > 70 && !isRefrigerated) return 1;
    if (temperature > 85) return 1;
    
    // low risk conditions
    if (temperature < 40 && isRefrigerated && isSealed) return 0;
    if (temperature < 60 && isRefrigerated) return 0;
    
    return 1; // default to high risk for safety
}

// recipe generation function that provides specific recipes for different foods
// falls back to category-based recipes if no specific recipe exists
function generateRecipe(foodType, specificFood) {
    // database of specific recipes for individual food items
    // each recipe includes name, ingredients list, and step-by-step instructions
    const specificRecipes = {
        "Carrots": [
            { name: "Honey-Glazed Carrots with Thyme", ingredients: ["Carrots", "Honey", "Fresh Thyme", "Butter", "Orange Zest", "Salt", "Black Pepper"], instructions: ["Peel and cut carrots into uniform pieces", "Melt butter in a pan over medium heat", "Add carrots and cook until slightly tender", "Add honey, thyme, and orange zest", "Continue cooking until carrots are glazed", "Season with salt and pepper", "Serve hot as a side dish"] },
            { name: "Carrot and Ginger Soup", ingredients: ["Carrots", "Fresh Ginger", "Onion", "Garlic", "Vegetable Stock", "Coconut Milk", "Cumin", "Coriander"], instructions: ["Sauté onion, garlic, and ginger", "Add chopped carrots and spices", "Pour in vegetable stock", "Simmer until carrots are tender", "Blend until smooth", "Add coconut milk", "Garnish with fresh herbs"] }
        ],
        // ... other specific recipes ...
    };

    // check if specific recipes exist for the selected food
    if (specificRecipes[specificFood]) return specificRecipes[specificFood];

    // fallback recipes for each food category
    // these are generated dynamically based on the food type
    const categoryRecipes = {
        vegetables: [{ name: `Asian-Inspired ${specificFood} Stir Fry`, ingredients: [specificFood, "Soy Sauce", "Garlic", "Ginger", "Sesame Oil", "Red Pepper Flakes", "Green Onions", "Sesame Seeds", "Rice Vinegar"], instructions: ["Wash and cut the vegetables into uniform pieces", "Heat sesame oil in a wok or large pan over high heat", "Add minced garlic and ginger, stir fry for 30 seconds", "Add vegetables and stir fry for 3-5 minutes until crisp-tender", "Add soy sauce, rice vinegar, and red pepper flakes", "Garnish with chopped green onions and sesame seeds", "Serve hot with rice or noodles"] }],
        fruits: [{ name: `${specificFood} & Yogurt Parfait`, ingredients: [specificFood, "Greek Yogurt", "Granola", "Honey", "Chia Seeds", "Vanilla Extract", "Mint Leaves"], instructions: ["Layer Greek yogurt in a glass", "Add a layer of granola", "Arrange sliced fruit on top", "Drizzle with honey", "Sprinkle chia seeds", "Garnish with mint leaves", "Serve immediately"] }],
        meat: [{ name: `${specificFood} & Vegetable Curry`, ingredients: [specificFood, "Coconut Milk", "Curry Paste", "Onion", "Bell Peppers", "Fresh Ginger", "Garlic", "Cilantro", "Rice"], instructions: ["Cut meat into cubes", "Sauté onion, garlic, and ginger", "Add curry paste and cook until fragrant", "Add meat and cook until browned", "Add coconut milk and vegetables", "Simmer until meat is tender", "Serve with rice and fresh cilantro"] }],
        dairy: [{ name: `${specificFood} & Spinach Stuffed Shells`, ingredients: [specificFood, "Jumbo Pasta Shells", "Spinach", "Ricotta Cheese", "Mozzarella", "Parmesan", "Marinara Sauce", "Fresh Basil"], instructions: ["Cook pasta shells", "Mix dairy product with ricotta and spinach", "Stuff shells with mixture", "Arrange in baking dish", "Top with marinara and cheese", "Bake until bubbly", "Garnish with fresh basil"] }],
        pantry: [{ name: `${specificFood} & Vegetable Buddha Bowl`, ingredients: [specificFood, "Quinoa", "Roasted Vegetables", "Chickpeas", "Tahini Sauce", "Fresh Greens", "Seeds", "Lemon"], instructions: ["Cook quinoa and main ingredient", "Roast vegetables", "Make tahini sauce", "Assemble bowl with greens", "Add cooked ingredients", "Top with sauce and seeds", "Serve with lemon wedges"] }],
        baked_goods: [{ name: `${specificFood} & Chocolate Bread Pudding`, ingredients: [specificFood, "Chocolate Chips", "Eggs", "Heavy Cream", "Vanilla", "Cinnamon", "Raisins", "Whipped Cream"], instructions: ["Mix eggs and cream", "Add spices and vanilla", "Mix with bread and chocolate", "Add raisins", "Pour into baking dish", "Bake until set", "Serve with whipped cream"] }],
        snacks: [{ name: `${specificFood} & Nut Energy Bites`, ingredients: [specificFood, "Mixed Nuts", "Dates", "Oats", "Honey", "Chia Seeds", "Vanilla Extract", "Coconut"], instructions: ["Process nuts and dates", "Mix with main ingredient", "Add oats and seeds", "Form into balls", "Roll in coconut", "Chill until firm", "Store in airtight container"] }]
    };

    // return category-based recipe or fallback message if no recipe exists
    return categoryRecipes[foodType] || [{ name: `${specificFood} Recipe`, ingredients: ["Recipe not available"], instructions: ["Please try a different food type"] }];
}

// initialize the application when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // get references to important DOM elements
    const form = document.getElementById('predictionForm');
    const predictionMessage = document.getElementById('predictionMessage');
    const recipeList = document.getElementById('recipeList');
    const foodTypeSelect = document.getElementById('foodType');
    const specificFoodSelect = document.getElementById('specificFood');

    // function to populate the food category dropdown
    function loadFoodTypes() {
        foodTypeSelect.innerHTML = '<option value="">Select a category</option>';
        Object.entries(FOOD_TYPES).forEach(([key, value]) => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = value.name;
            foodTypeSelect.appendChild(option);
        });
    }

    // update the specific food dropdown when category changes
    foodTypeSelect.addEventListener('change', () => {
        const selectedType = foodTypeSelect.value;
        specificFoodSelect.innerHTML = '<option value="">Select a food item</option>';
        if (selectedType) {
            FOOD_TYPES[selectedType].items.forEach(item => {
                const option = document.createElement('option');
                option.value = item;
                option.textContent = item;
                specificFoodSelect.appendChild(option);
            });
        }
    });

    // handle form submission and display results
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // get form values
        const temperature = parseFloat(document.getElementById('temperature').value);
        const isRefrigerated = parseInt(document.getElementById('is_refrigerated').value);
        const isSealed = parseInt(document.getElementById('is_sealed').value);
        const foodType = document.getElementById('foodType').value;
        const specificFood = document.getElementById('specificFood').value;

        // calculate prediction and get storage information
        const prediction = predictSpoilage(temperature, isRefrigerated, isSealed);
        const storageTips = STORAGE_TIPS[foodType];
        const shelfLife = SHELF_LIFE[foodType];
        const estimatedDays = isRefrigerated ? shelfLife.refrigerated : shelfLife.room_temp;
        
        // update the prediction message with detailed information
        predictionMessage.innerHTML = `
            <h3>${prediction === 1 ? 'High Risk of Spoilage' : 'Low Risk of Spoilage'}</h3>
            <p><strong>Estimated Shelf Life:</strong> ${estimatedDays} days</p>
            <p><strong>Storage Recommendations:</strong></p>
            <ul>
                <li>${storageTips.refrigeration}</li>
                <li>Ideal Temperature: ${storageTips.temperature}</li>
                <li>Packaging: ${storageTips.packaging}</li>
                <li>Additional Tips: ${storageTips.tips}</li>
            </ul>
        `;
        predictionMessage.className = `message ${prediction === 1 ? 'high-risk' : 'low-risk'}`;

        // generate and display recipe suggestions
        const recipes = generateRecipe(foodType, specificFood);
        recipeList.innerHTML = recipes.map(recipe => `
            <div class="recipe-card">
                <h3>${recipe.name}</h3>
                <h4>Ingredients:</h4>
                <ul>${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
                <h4>Instructions:</h4>
                <ol>${recipe.instructions.map(instruction => `<li>${instruction}</li>`).join('')}</ol>
            </div>
        `).join('');
    });

    // initialize the food categories when the page loads
    loadFoodTypes();
}); 