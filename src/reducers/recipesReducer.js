import { GET_RECIPES, GET_RECIPES_SUCCESS, GET_RECIPES_ERROR } from '../actions';

const INITIAL_STATE = {
  recipes: [],
  loading: false,
  error: null,
};

const mealsAndDrinksReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case GET_RECIPES:
    return {
      ...state,
      loading: true,
      error: null,
    };
  case GET_RECIPES_SUCCESS:
    return {
      ...state,
      loading: false,
      recipes: payload,
    };
  case GET_RECIPES_ERROR:
    return {
      ...state,
      loading: false,
      error: payload,
    };
  default:
    return state;
  }
};

export default mealsAndDrinksReducer;
