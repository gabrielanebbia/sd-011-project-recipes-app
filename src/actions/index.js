import { getXFirstElementsFromArray } from '../helpers/utils';

export const GET_RECIPES = 'GET_RECIPES';
export const GET_RECIPES_SUCCESS = 'GET_RECIPES_SUCCESS';
export const GET_RECIPES_ERROR = 'GET_RECIPES_ERROR';
export const GET_RECIPES_CATEGORIES = 'GET_RECIPES_CATEGORIES';
export const GET_RECIPES_CATEGORIES_SUCCESS = 'GET_RECIPES_CATEGORIES_SUCCESS';
export const GET_RECIPES_CATEGORIES_ERROR = 'GET_RECIPES_CATEGORIES_ERROR';
export const GET_HEADER_SEARCH = 'GET_HEADER_SEARCH';
export const GET_HEADER_SEARCH_SUCCESS = 'GET_HEADER_SEARCH_SUCCESS';
export const GET_HEADER_SEARCH_ERROR = 'GET_HEADER_SEARCH_ERROR';
export const HEADER_SEARCH_RESET_ERROR = 'HEADER_SEARCH_RESET_ERROR';
export const SET_SELECTED_CATEGORY = 'SET_SELECTED_CATEGORY';
export const GET_RANDOM_RECIPE = 'GET_RANDOM_RECIPE';
export const GET_RANDOM_RECIPE_SUCCESS = 'GET_RANDOM_RECIPE_SUCCESS';
export const GET_RANDOM_RECIPE_ERROR = 'GET_RANDOM_RECIPE_ERROR';

const recipesQuantity = 12;
const baseMealDbUrl = 'https://www.themealdb.com/api/json/v1/1';
const baseCocktailDbUrl = 'https://www.thecocktaildb.com/api/json/v1/1';

const getRecipes = () => ({
  type: GET_RECIPES,
});

const getRecipesSuccess = (meals) => ({
  type: GET_RECIPES_SUCCESS,
  payload: meals,
});

const getRecipesError = (error) => ({
  type: GET_RECIPES_ERROR,
  payload: error,
});

export const fetchRecipes = (type, category = null) => (dispatch) => {
  dispatch(getRecipes());

  const baseUrl = type === 'meals' ? baseMealDbUrl : baseCocktailDbUrl;
  const url = category
    ? `${baseUrl}/filter.php?c=${category}`
    : `${baseUrl}/search.php?s=`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const recipes = getXFirstElementsFromArray(
        type === 'meals' ? data.meals : data.drinks, recipesQuantity,
      );
      dispatch(getRecipesSuccess(recipes));
    })
    .catch((error) => dispatch(getRecipesError(error)));
};

const getRecipesCategories = () => ({
  type: GET_RECIPES_CATEGORIES,
});

const getRecipesCategoriesSuccess = (payload) => ({
  type: GET_RECIPES_CATEGORIES_SUCCESS,
  payload,
});

const getRecipesCategoriesError = (error) => ({
  type: GET_RECIPES_CATEGORIES_ERROR,
  payload: error,
});

export const fetchRecipesCategories = (type) => (dispatch) => {
  dispatch(getRecipesCategories());

  const url = `${type === 'comidas' ? baseMealDbUrl : baseCocktailDbUrl}/list.php?c=list`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const info = type === 'comidas' ? data.meals : data.drinks;
      const categories = info.map(({ strCategory }) => strCategory);
      dispatch(getRecipesCategoriesSuccess({ categories, type }));
    })
    .catch((error) => dispatch(getRecipesCategoriesError(error)));
};

const getHeaderSearch = () => ({
  type: GET_HEADER_SEARCH,
});

const getHeaderSearchSuccess = (payload) => ({
  type: GET_HEADER_SEARCH_SUCCESS,
  payload,
});

const getHeaderSearchError = (error) => ({
  type: GET_HEADER_SEARCH_ERROR,
  payload: error,
});

export const fetchHeaderSearch = (type, filter, keyWord) => (dispatch) => {
  dispatch(getHeaderSearch());

  const url = type === 'comidas' ? baseMealDbUrl : baseCocktailDbUrl;

  const setUrl = { ingrediente: `${url}/filter.php?i=${keyWord}`,
    nome: `${url}/search.php?s=${keyWord}`,
    'primeira-letra': `${url}/search.php?f=${keyWord}` };

  const urlFilter = setUrl[filter];

  return fetch(urlFilter)
    .then((response) => response.json())
    .then((data) => {
      const info = type === 'comidas' ? data.meals : data.drinks;
      const results = info.map((item) => item);
      dispatch(getHeaderSearchSuccess({ results, type, filter, keyWord }));
    })
    .catch((error) => dispatch(getHeaderSearchError(error)));
};

export const headerSearchResetError = () => ({
  type: HEADER_SEARCH_RESET_ERROR,
});

export const setSelectedCategory = (payload) => ({
  type: SET_SELECTED_CATEGORY,
  payload,
});

const randomFoodUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';
const randomDrinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

const getRandomRecipe = () => ({
  type: GET_RANDOM_RECIPE,
});

const getRandomRecipeSuccess = (payload) => ({
  type: GET_RANDOM_RECIPE_SUCCESS,
  payload,
});

const getRandomRecipeError = (error) => ({
  type: GET_RANDOM_RECIPE_ERROR,
  payload: error,
});

export const fetchRandomRecipe = (type) => (dispatch) => {
  dispatch(getRandomRecipe());

  const url = `${type === 'comidas' ? randomFoodUrl : randomDrinkUrl}`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const randomId = type === 'comidas' ? data.meals[0].idMeal : data.drinks[0].idDrink;
      dispatch(getRandomRecipeSuccess(randomId));
    })
    .catch((error) => dispatch(getRandomRecipeError(error)));
};
