import { getXFirstElementsFromArray } from '../helpers/utils';

export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';

const mealDbUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
const cocktailDbUrl = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';

const getIngredients = () => ({
  type: GET_INGREDIENTS,
});

const getIngredientsSuccess = (payload) => ({
  type: GET_INGREDIENTS_SUCCESS,
  payload,
});

const getIngredientsError = (error) => ({
  type: GET_INGREDIENTS_ERROR,
  payload: error,
});

export const fetchIngredients = (type) => (dispatch) => {
  dispatch(getIngredients());

  const url = `${type === 'comidas' ? mealDbUrl : cocktailDbUrl}`;
  const firstIngredients = 12;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const ingredientsList = type === 'comidas'
        ? getXFirstElementsFromArray(data.meals, firstIngredients)
        : getXFirstElementsFromArray(data.drinks, firstIngredients);
      dispatch(getIngredientsSuccess(ingredientsList));
    })
    .catch((error) => dispatch(getIngredientsError(error)));
};
