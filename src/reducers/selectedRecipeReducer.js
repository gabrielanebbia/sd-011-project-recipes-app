import {
  GET_RECIPE_DETAIL, GET_RECIPE_DETAIL_SUCCESS, GET_RECIPE_DETAIL_ERROR,
  SET_RECIPE_INGREDIENTS, UPDATE_IN_PROGRESS,
} from '../actions/selectedRecipe';

const INITIAL_STATE = {
  recipe: {},
  loading: false,
  error: null,
  ingredients: [],
  inProgress: {},
};

const selectedRecipeReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case GET_RECIPE_DETAIL:
    return {
      ...state,
      loading: true,
      error: null,
      ingredients: [],
    };
  case GET_RECIPE_DETAIL_SUCCESS:
    return {
      ...state,
      loading: false,
      recipe: payload,
    };
  case GET_RECIPE_DETAIL_ERROR:
    return {
      ...state,
      loading: false,
      error: payload,
    };
  case SET_RECIPE_INGREDIENTS:
    return {
      ...state,
      ingredients: payload,
    };
  case UPDATE_IN_PROGRESS:
    return {
      ...state,
      inProgress: payload,
    };
  default:
    return state;
  }
};

export default selectedRecipeReducer;
