import {
  GET_HEADER_SEARCH, GET_HEADER_SEARCH_SUCCESS, GET_HEADER_SEARCH_ERROR,
  HEADER_SEARCH_RESET_ERROR,
} from '../actions';

const INITIAL_STATE = {
  recipes: [],
  type: 'not defined',
  filter: '',
  keyWord: '',
  loading: true,
  error: null,
};

const headerSearchReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case GET_HEADER_SEARCH:
    return {
      ...state,
      loading: true,
      error: null,
    };
  case GET_HEADER_SEARCH_SUCCESS:
    return {
      ...state,
      loading: false,
      recipes: payload.results,
      type: payload.type,
      filter: payload.filter,
      keyWord: payload.keyWord,
    };
  case GET_HEADER_SEARCH_ERROR:
    return {
      ...state,
      loading: false,
      error: `${payload}`,
    };
  case HEADER_SEARCH_RESET_ERROR:
    return {
      ...state,
      error: null,
    };
  default:
    return state;
  }
};

export default headerSearchReducer;
