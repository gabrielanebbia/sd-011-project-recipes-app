import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchRecipeDetail, setRecipeIngredients, updateInProgress,
} from '../actions/selectedRecipe';
import FinishRecipeButton from '../components/FinishRecipeButton';
import { getFromStorage, setToStorage } from '../helpers/utils';
import style from './RecipeInProgress.module.css';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';

function RecipeInProgress({
  match: { params: { id }, path },
  recipe, ingredients, inProgress,
  dispatchFetchRecipe, dispatchSetIngredients, dispatchUpdateInProgress,
}) {
  const [type, setType] = React.useState('');

  React.useEffect(() => {
    const recipesInProgress = getFromStorage('inProgressRecipes') || {};
    dispatchUpdateInProgress(recipesInProgress);
  }, [dispatchUpdateInProgress]);

  React.useEffect(() => {
    setType(path.replace(/(^\/)|(\/)(:|\w|-)+/g, ''));
    dispatchFetchRecipe(type, id);
  }, [dispatchFetchRecipe, id, path, type]);

  React.useEffect(() => {
    (() => {
      const ingredientsCount = 20;
      const ingredientsList = [];

      for (let index = 1; index <= ingredientsCount; index += 1) {
        const ingredient = recipe[`strIngredient${index}`];
        const measure = recipe[`strMeasure${index}`];

        if (
          recipe[`strIngredient${index}`]
          && recipe[`strIngredient${index}`].length > 0
        ) {
          ingredientsList.push([ingredient, measure]);
        } else break;
      }

      dispatchSetIngredients(ingredientsList);
    })();
  }, [recipe, dispatchSetIngredients]);

  const addStepToStorage = (value, storageItem) => {
    const updatedItem = {
      ...storageItem,
      [id]: [
        ...(storageItem[id] || []),
        value,
      ].sort((firstNumber, secondNumber) => firstNumber - secondNumber),
    };

    setToStorage('inProgressRecipes', updatedItem);
    dispatchUpdateInProgress(updatedItem);
  };

  const removeStepFromStorage = (value, storageItem) => {
    const updatedItem = {
      ...storageItem,
      [id]: storageItem[id].filter((item) => item !== value),
    };

    if (updatedItem[id].length === 0) delete updatedItem[id];

    setToStorage('inProgressRecipes', updatedItem);
    dispatchUpdateInProgress(updatedItem);
  };

  const handleStepDone = (target, index) => {
    const recipesInProgress = getFromStorage('inProgressRecipes') || {};

    if (target.checked) addStepToStorage(index, recipesInProgress);
    else removeStepFromStorage(index, recipesInProgress);
  };

  const details = {
    strThumb: recipe.strDrinkThumb || recipe.strMealThumb,
    str: recipe.strDrink || recipe.strMeal,
    strCategory: recipe.strCategory,
    strInstructions: recipe.strInstructions,
  };

  const isStepDone = (index) => inProgress[id] && inProgress[id].includes(index + 1);

  const detailPage = `/${type}/${id}`;

  return (
    <main data-testid="recipes-page">
      <img src={ details.strThumb } alt="" data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">{ details.str }</h1>
      <ShareButton
        dataTestId="share-btn"
        testLocation="button"
        url={ `${window.location.origin}${detailPage}` }
      />

      <FavoriteButton recipe={ recipe } dataTestId="favorite-btn" />
      <p data-testid="recipe-category">{ details.strCategory }</p>
      <ul>
        {
          ingredients.map(([ingredient, measure], index) => (
            <li key={ ingredient } data-testid={ `${index}-ingredient-step` }>
              <label
                htmlFor={ `ingredient${index + 1}` }
                className={ isStepDone(index) ? style.checked : null }
              >
                <input
                  type="checkbox"
                  id={ `ingredient${index + 1}` }
                  checked={ isStepDone(index) }
                  onChange={ ({ target }) => handleStepDone(target, index + 1) }
                />
                { `${ingredient} - ${measure}` }
              </label>
            </li>
          ))
        }
      </ul>
      <p data-testid="instructions">
        { details.strInstructions }
      </p>
      <FinishRecipeButton id={ id } recipe={ recipe } type={ type.replace('s', '') } />
    </main>
  );
}

const mapStateToProps = (
  { selectedRecipeReducer: { recipe, ingredients, inProgress } },
) => ({
  recipe,
  ingredients,
  inProgress,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchRecipe: (type, id) => dispatch(fetchRecipeDetail(type, id)),
  dispatchSetIngredients: (ingredients) => dispatch(setRecipeIngredients(ingredients)),
  dispatchUpdateInProgress: (InProgress) => dispatch(updateInProgress(InProgress)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeInProgress);

RecipeInProgress.defaultProps = {
  recipe: {},
  ingredients: [],
  inProgress: {},
};

RecipeInProgress.propTypes = {
  dispatchFetchRecipe: PropTypes.func,
  dispatchSetIngredients: PropTypes.func,
  dispatchUpdateInProgress: PropTypes.func,
}.isRequired;
