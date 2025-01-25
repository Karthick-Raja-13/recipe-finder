import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/favouritesList.css'; // Make sure to import the CSS file

const FavoritesList = ({ favoriteRecipes, handleRemoveFromFavorites }) => {
  const navigate = useNavigate(); // React Router's navigation function

  const handleImageClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`); // Navigate to the recipe details page
  };

  return (
    <div className="favorites-container">
      <h2>Favorite Recipes</h2>
      {favoriteRecipes.length > 0 ? (
        <div className="recipe-grid">
          {favoriteRecipes.map((recipe) => (
            <div className="recipe-card" key={recipe.id}>
              <img
                src={recipe.image}
                alt={recipe.name}
                className="recipe-image"
                onClick={() => handleImageClick(recipe.id)} // Handle image click
              />
              <div className="recipe-card-body">
                <h3>{recipe.name}</h3>
                <p><strong>Meal Type:</strong> {recipe.mealType.join(', ')}</p>
                <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
                <p><strong>Calories per Serving:</strong> {recipe.caloriesPerServing}</p>
                <button
                  className="remove-button"
                  onClick={() => handleRemoveFromFavorites(recipe)}
                >
                  Remove from Favorites
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-favorites">No favorite recipes</p>
      )}
    </div>
  );
};

export default FavoritesList;
