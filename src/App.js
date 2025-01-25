import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes, filterRecipes } from "./slices/recipeSlice";
import { addToFavorites, removeFromFavorites } from "./slices/favouriteSlice";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import SearchBar from "./components/SearchBar";
import RecipeList from "./components/RecipeList";
import FavoritesList from "./components/FavouritesList";
import "./css/app.css";
import RecipeDetails from "./components/RecipeDetails";

const App = () => {
  const dispatch = useDispatch();
  const { filteredRecipes, loading, error } = useSelector(
    (state) => state.recipes
  );
  const { favoriteRecipes } = useSelector((state) => state.favorites);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
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
    dispatch(addToFavorites(recipe));
  };

  const handleRemoveFromFavorites = (recipe) => {
    dispatch(removeFromFavorites(recipe));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  return (
    <Router>
      <div className="app-container">
        <h1>Recipe Finder App</h1>
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
        <SearchBar
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          categoryFilter={categoryFilter}
          handleCategoryChange={handleCategoryChange}
          handleSearchButtonClick={handleSearchButtonClick}
        />
        {loading && <p>Loading...</p>}
        {error && <p>Error fetching recipes: {error.message}</p>}
        <Routes>
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
          <Route
            path="/recipe/:id"
            element={<RecipeDetails recipes={filteredRecipes} />}
          />
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
