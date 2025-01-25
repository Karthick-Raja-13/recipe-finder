import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteRecipes: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      if (
        !state.favoriteRecipes.some((recipe) => recipe.id === action.payload.id)
      ) {
        state.favoriteRecipes.push(action.payload);
      }
    },
    removeFromFavorites: (state, action) => {
      state.favoriteRecipes = state.favoriteRecipes.filter(
        (recipe) => recipe.id !== action.payload.id
      );
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
