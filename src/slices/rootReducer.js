import { combineReducers } from "redux";
import recipesReducer from "./recipeSlice";
import favoritesReducer from "./favouriteSlice";

const rootReducer = combineReducers({
  recipes: recipesReducer,
  favorites: favoritesReducer,
});

export default rootReducer;
