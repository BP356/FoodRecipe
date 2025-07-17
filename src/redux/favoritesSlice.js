import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteRecipes: [], // Updated to handle favorite articles
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const recipe = action.payload;
      const existInd = state.favoriteRecipes.findIndex(
        (item) => ((item.idFood && item.idFood === recipe.idFood) || (item.title && item.title === recipe.title))
      );
      if (existInd >= 0) {
        state.favoriteRecipes.splice(existInd, 1); // remove
      }
      else {
        state.favoriteRecipes.push(recipe); // add
      }
    }
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
