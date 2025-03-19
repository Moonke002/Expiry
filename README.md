# Food Spoilage Predictor

A web application that predicts food spoilage based on storage conditions and suggests recipes to minimize waste.

## Features

- Predict food spoilage based on:
  - Temperature
  - Humidity
  - Storage type (refrigerated/room temperature)
  - Packaging (sealed/unsealed)
- Get recipe suggestions based on food type
- Modern, responsive user interface

## Setup

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Start the Flask backend:
```bash
python app.py
```

3. Open `index.html` in your web browser

## Usage

1. Enter the storage conditions for your food item
2. Select the food type
3. Click "Predict & Get Recipes"
4. View the prediction result and recipe suggestions

## Technical Details

- Backend: Python Flask with scikit-learn
- Frontend: HTML, CSS, JavaScript
- Model: Random Forest Classifier
- API Endpoints:
  - POST /predict: Get spoilage prediction
  - GET /recipes: Get recipe suggestions

## Note

This is a demo application using sample data. For production use, you would need to:
- Train the model with real food spoilage data
- Expand the recipe database
- Add user authentication
- Implement proper error handling
- Add input validation 