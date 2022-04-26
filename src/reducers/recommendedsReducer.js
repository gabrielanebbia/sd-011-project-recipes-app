import { RECOMMENDED_RECIPES, RECOMMENDED_RECIPES_SUCCESS,
  RECOMMENDED_RECIPES_ERROR } from '../actions/recipeDetail_actions';

const INITIAL_STATE = {
  recommended: [],
  type: 'not defined',
  loading: false,
  error: null,
};

const recommendedsReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case RECOMMENDED_RECIPES:
    return {
      ...state, loading: true, error: null,
    };
  case RECOMMENDED_RECIPES_SUCCESS:
    return {
      ...state, loading: false, recommended: payload.recommended, type: payload.type,
    };
  case RECOMMENDED_RECIPES_ERROR:
    return {
      ...state, loading: false, error: payload,
    };
  default:
    return state;
  }
};

export default recommendedsReducer;
