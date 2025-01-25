import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  allRecipes: [],
  filteredRecipes: [],
  loading: false,
  error: null,
};

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async ({ rejectWithValue }) => {
    const url = `https://dummyjson.com/recipes`;

    try {
      const response = await axios.get(url);
      console.log(response.data);

      return response.data.recipes.map((hit) => ({
        id: hit.id,
        name: hit.name,
        ingredients: hit.ingredients,
        instructions: hit.instructions,
        prepTimeMinutes: hit.prepTimeMinutes,
        cookTimeMinutes: hit.cookTimeMinutes,
        servings: hit.servings,
        difficulty: hit.difficulty,
        cuisine: hit.cuisine,
        caloriesPerServing: hit.caloriesPerServing,
        tags: hit.tags,
        userId: hit.userId,
        image: hit.image,
        rating: hit.rating,
        reviewCount: hit.reviewCount,
        mealType: hit.mealType,
      }));
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    filterRecipes: (state, action) => {
      const { category, searchTerm, difficulty, cuisine } = action.payload;
      state.filteredRecipes = state.allRecipes.filter((recipe) => {
        const matchesCategory = category
          ? recipe.mealType.includes(category)
          : true;
        const matchesSearchTerm = searchTerm
          ? recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
          : true;
        const matchesDifficulty = difficulty
          ? recipe.difficulty === difficulty
          : true;
        const matchesCuisine = cuisine ? recipe.cuisine === cuisine : true;

        return (
          matchesCategory &&
          matchesSearchTerm &&
          matchesDifficulty &&
          matchesCuisine
        );
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.allRecipes = action.payload;
        state.filteredRecipes = action.payload;
        state.loading = false;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { filterRecipes } = recipeSlice.actions;

export default recipeSlice.reducer;
