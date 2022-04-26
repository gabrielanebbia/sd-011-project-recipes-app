import { RECIPE_DETAIL, RECIPE_DETAIL_SUCCESS,
  RECIPE_DETAIL_ERROR } from '../actions/recipeDetail_actions';

const INITIAL_STATE = {
  detail: {},
  type: 'not defined',
  loading: false,
  error: null,
};

const recipeDetailReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case RECIPE_DETAIL:
    return {
      ...state, loading: true, error: null,
    };
  case RECIPE_DETAIL_SUCCESS:
    return {
      ...state,
      loading: false,
      detail: payload.detail[0],
      type: payload.type,
    };
  case RECIPE_DETAIL_ERROR:
    return {
      ...state, loading: false, error: payload,
    };
  default:
    return state;
  }
};

export default recipeDetailReducer;
