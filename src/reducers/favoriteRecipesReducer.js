import { UPDATE_FAVORITE_RECIPES } from '../actions/favoriteRecipes';

const INITIAL_STATE = {
  favoriteRecipes: [],
};

const mealsAndDrinksReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case UPDATE_FAVORITE_RECIPES:
    return {
      ...state,
      favoriteRecipes: [...payload],
    };
  default:
    return state;
  }
};

export default mealsAndDrinksReducer;
