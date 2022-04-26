export const RECOMMENDED_RECIPES = 'RECOMMENDED_RECIPES';
export const RECOMMENDED_RECIPES_SUCCESS = 'RECOMMENDED_RECIPES_SUCCESS';
export const RECOMMENDED_RECIPES_ERROR = ' RECOMMENDED_RECIPES_ERROR';
export const RECIPE_DETAIL = 'RECIPE_DETAIL';
export const RECIPE_DETAIL_SUCCESS = 'RECIPE_DETAIL_SUCCESS';
export const RECIPE_DETAIL_ERROR = 'RECIPE_DETAIL_ERROR';

const baseMealDbUrl = 'https://www.themealdb.com/api/json/v1/1';
const baseCocktailDbUrl = 'https://www.thecocktaildb.com/api/json/v1/1';

const recipeDetail = () => ({
  type: RECIPE_DETAIL,
});

const recipeDetailSuccess = (payload) => ({
  type: RECIPE_DETAIL_SUCCESS,
  payload,
});

const recipeDetailError = (payload) => ({
  type: RECIPE_DETAIL_ERROR,
  payload,
});

export const fetchRecipeDetail = (type, id) => (dispatch) => {
  dispatch(recipeDetail());

  const url = `${type === 'comidas'
    ? baseMealDbUrl : baseCocktailDbUrl}/lookup.php?i=${id}`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const detail = type === 'comidas' ? data.meals : data.drinks;
      dispatch(recipeDetailSuccess({ detail, type }));
    })
    .catch((error) => {
      dispatch(recipeDetailError(error));
    });
};

const recommendedRecipes = () => ({
  type: RECOMMENDED_RECIPES,
});

const recommendedRecipesSuccess = (payload) => ({
  type: RECOMMENDED_RECIPES_SUCCESS,
  payload,
});

const recommendedRecipesError = (payload) => ({
  type: RECOMMENDED_RECIPES_ERROR,
  payload,
});

export const fetchRecommended = (type) => (dispatch) => {
  dispatch(recommendedRecipes());
  const url = `${type === 'comidas' ? baseCocktailDbUrl : baseMealDbUrl}/search.php?s=`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const recommended = type === 'comidas' ? data.drinks : data.meals;
      dispatch(recommendedRecipesSuccess({ recommended, type }));
    })
    .catch((error) => {
      dispatch(recommendedRecipesError(error));
    });
};
