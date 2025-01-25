import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes, filterRecipes } from './slices/recipeSlice';
import { addToFavorites, removeFromFavorites } from './slices/favouriteSlice';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import FavoritesList from './components/FavouritesList';
import "./css/app.css"; // Import custom CSS
import RecipeDetails from './components/RecipeDetails';

const App = () => {
  const dispatch = useDispatch();
  const { filteredRecipes, loading, error } = useSelector((state) => state.recipes);
  const { favoriteRecipes } = useSelector((state) => state.favorites);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  useEffect(() => {
    dispatch(fetchRecipes());
  }, []);

  const handleSearchButtonClick = () => {
    dispatch(
      filterRecipes({
        category: categoryFilter,
        searchTerm: searchTerm,
      })
    );
  };

  const handleAddToFavorites = (recipe) => {
    dispatch(addToFavorites(recipe)); // Adds to favorites
  };

  const handleRemoveFromFavorites = (recipe) => {
    dispatch(removeFromFavorites(recipe)); // Removes from favorites
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value); // Update search term state
  };

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value); // Update category filter
  };

  return (
    <Router>
      <div className="app-container">
        <h1>Recipe Finder App</h1>

        {/* Navigation Links */}
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/favorites">Favorites</Link>
            </li>
          </ul>
        </nav>

        {/* SearchBar Component */}
        <SearchBar
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          categoryFilter={categoryFilter}
          handleCategoryChange={handleCategoryChange}
          handleSearchButtonClick={handleSearchButtonClick}
        />

        {/* Show loading and error messages */}
        {loading && <p>Loading...</p>}
        {error && <p>Error fetching recipes: {error.message}</p>}

        {/* Routes */}
        <Routes>
          {/* Home Route - Recipe List */}
          <Route
            path="/"
            element={
              <RecipeList
                recipes={filteredRecipes}
                handleAddToFavorites={handleAddToFavorites}
                favoriteRecipes={favoriteRecipes}
              />
            }
          />
          <Route path="/recipe/:id" element={<RecipeDetails recipes={filteredRecipes} />} />
          {/* Favorites Route */}
          <Route
            path="/favorites"
            element={
              <FavoritesList
                favoriteRecipes={favoriteRecipes}
                handleRemoveFromFavorites={handleRemoveFromFavorites}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
