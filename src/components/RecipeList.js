import React, { useState } from 'react';
import '../css/recipe.css'; // Import the CSS file

const RecipeList = ({ recipes, handleAddToFavorites, favoriteRecipes }) => {
  const recipesPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(recipes.length / recipesPerPage);
  const startIndex = (currentPage - 1) * recipesPerPage;
  const currentRecipes = recipes.slice(startIndex, startIndex + recipesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="recipe-list-container">
      <h2 className="text-center mb-4">Filtered Recipes</h2>
      {recipes.length > 0 ? (
        <div>
          <div className="recipe-grid">
            {currentRecipes.map((recipe) => (
              <div className="recipe-card" key={recipe.id}>
                <img
                  src={recipe.image}
                  alt={recipe.name}
                />
                <div className="recipe-card-body">
                  <h3>{recipe.name}</h3>
                  <p><strong>Meal Type:</strong> {recipe.mealType.join(', ')}</p>
                  <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
                  <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
                  <p><strong>Calories per Serving:</strong> {recipe.caloriesPerServing}</p>
                  <p><strong>Prep Time:</strong> {recipe.prepTimeMinutes} minutes</p>
                  <p><strong>Cook Time:</strong> {recipe.cookTimeMinutes} minutes</p>
                  <p><strong>Servings:</strong> {recipe.servings}</p>
                  <ul>
                    {recipe.instructions.map((ins, index) => (
                      <li key={index}>{ins}</li>
                    ))}
                  </ul>
                  <p><strong>Tags:</strong> {recipe.tags.join(', ')}</p>
                  <button
                    className="remove-button"
                    onClick={() => handleAddToFavorites(recipe)}
                  >
                    {favoriteRecipes.find(fav => fav.id === recipe.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination-container">
            <button
              className="pagination-button"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="page-info">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="pagination-button"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <p className="no-recipes">No recipes found</p>
      )}
    </div>
  );
};

export default RecipeList;
