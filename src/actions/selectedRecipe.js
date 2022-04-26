export const GET_RECIPE_DETAIL = 'GET_RECIPE_DETAIL';
export const GET_RECIPE_DETAIL_SUCCESS = 'GET_RECIPE_DETAIL_SUCCESS';
export const GET_RECIPE_DETAIL_ERROR = 'GET_RECIPE_DETAIL_ERROR';
export const SET_RECIPE_INGREDIENTS = 'SET_RECIPE_INGREDIENTS';
export const UPDATE_IN_PROGRESS = 'UPDATE_IN_PROGRESS';

const baseMealDbUrl = 'https://www.themealdb.com/api/json/v1/1';
const baseCocktailDbUrl = 'https://www.thecocktaildb.com/api/json/v1/1';

const getRecipeDetail = () => ({
  type: GET_RECIPE_DETAIL,
});

const getRecipeDetailSuccess = (payload) => ({
  type: GET_RECIPE_DETAIL_SUCCESS,
  payload,
});

const getRecipeDetailError = (payload) => ({
  type: GET_RECIPE_DETAIL_ERROR,
  payload,
});

export const fetchRecipeDetail = (type, id) => (dispatch) => {
  dispatch(getRecipeDetail());

  const baseUrl = type === 'comidas' ? baseMealDbUrl : baseCocktailDbUrl;
  const url = `${baseUrl}/lookup.php?i=${id}`;

  return fetch(url)
    .then((resposne) => resposne.json())
    .then((data) => {
      const recipe = type === 'comidas' ? data.meals[0] : data.drinks[0];
      return dispatch(getRecipeDetailSuccess(recipe));
    })
    .catch((error) => dispatch(getRecipeDetailError(error)));
};

export const setRecipeIngredients = (payload) => ({
  type: SET_RECIPE_INGREDIENTS,
  payload,
});

export const updateInProgress = (payload) => ({
  type: UPDATE_IN_PROGRESS,
  payload,
});
