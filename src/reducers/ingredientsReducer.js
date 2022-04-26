import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_ERROR,
} from '../actions/ingredients';

const INITIAL_STATE = {
  ingredients: [],
  loading: true,
  error: null,
};

const ingredientsReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case GET_INGREDIENTS:
    return {
      ...state,
      loading: true,
      error: null,
    };
  case GET_INGREDIENTS_SUCCESS:
    return {
      ...state,
      loading: false,
      ingredients: payload,
    };
  case GET_INGREDIENTS_ERROR:
    return {
      ...state,
      loading: false,
      error: payload,
    };
  default:
    return state;
  }
};

export default ingredientsReducer;
