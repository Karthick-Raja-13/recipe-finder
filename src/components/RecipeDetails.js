import React from 'react';
import { useParams } from 'react-router-dom';
import "../css/recipeDetails.css"
const RecipeDetails = ({ recipes }) => {
  const { id } = useParams(); 
  const recipe = recipes.find((r) => r.id === parseInt(id)); //Finding the Recipe With Params

  if (!recipe) {
    return <p>Recipe not found.</p>; 
  }

  return (
    <div className="recipe-details-container">
      <h1 className="recipe-title">{recipe.name}</h1>
      <img src={recipe.image} alt={recipe.name} className="recipe-image" />
      <div className="recipe-info">
        <p><strong>Meal Type:</strong> {recipe.mealType.join(', ')}</p>
        <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
        <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
        <p><strong>Calories per Serving:</strong> {recipe.caloriesPerServing}</p>
        <p><strong>Prep Time:</strong> {recipe.prepTimeMinutes} minutes</p>
        <p><strong>Cook Time:</strong> {recipe.cookTimeMinutes} minutes</p>
        <p><strong>Servings:</strong> {recipe.servings}</p>
      </div>
      <div className="recipe-instructions">
        <h3>Instructions</h3>
        <ul>
          {recipe.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ul>
      </div>
      <div className="recipe-tags">
        <p><strong>Tags:</strong> {recipe.tags.join(', ')}</p>
      </div>
    </div>
  );
};

export default RecipeDetails;
