import {
  GET_AREAS,
  GET_AREAS_SUCCESS,
  GET_AREAS_ERROR,
} from '../actions/areas';

const INITIAL_STATE = {
  areas: [],
  loading: true,
  error: null,
};

const areasReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case GET_AREAS:
    return {
      ...state,
      loading: true,
      error: null,
    };
  case GET_AREAS_SUCCESS:
    return {
      ...state,
      loading: false,
      areas: payload,
    };
  case GET_AREAS_ERROR:
    return {
      ...state,
      loading: false,
      error: payload,
    };
  default:
    return state;
  }
};

export default areasReducer;
