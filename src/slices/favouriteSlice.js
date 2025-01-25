// src/redux/favoritesSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favoriteRecipes: [], // Store favorite recipes
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      // Check if the recipe is already in the favorites list
      if (!state.favoriteRecipes.some(recipe => recipe.id === action.payload.id)) {
        state.favoriteRecipes.push(action.payload);
      }
    },
    removeFromFavorites: (state, action) => {
      // Remove the recipe from the favorites list by matching its unique id
      state.favoriteRecipes = state.favoriteRecipes.filter(recipe => recipe.id !== action.payload.id);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
