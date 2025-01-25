import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/favouritesList.css";

const FavoritesList = ({ favoriteRecipes, handleRemoveFromFavorites }) => {
  const navigate = useNavigate();

  const handleImageClick = (recipeId) => {
    // To View the Full Details of the Recipe in Favourites
    navigate(`/recipe/${recipeId}`);
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
                onClick={() => handleImageClick(recipe.id)}
              />
              <div className="recipe-card-body">
                <h3>{recipe.name}</h3>
                <p>
                  <strong>Meal Type:</strong> {recipe.mealType.join(", ")}
                </p>
                <p>
                  <strong>Cuisine:</strong> {recipe.cuisine}
                </p>
                <p>
                  <strong>Calories per Serving:</strong>{" "}
                  {recipe.caloriesPerServing}
                </p>
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
