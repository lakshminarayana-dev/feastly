import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface FavoritesState {
  meals: Meal[];
}

const initialState: FavoritesState = {
  meals: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Meal>) => {
      const exists = state.meals.find(m => m.idMeal === action.payload.idMeal);
      if (!exists) {
        state.meals.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.meals = state.meals.filter(m => m.idMeal !== action.payload);
    },
  },
});

export const {addFavorite, removeFavorite} = favoritesSlice.actions;
export default favoritesSlice.reducer;
