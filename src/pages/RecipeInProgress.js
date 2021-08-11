import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchRecipeDetail } from '../actions/selectedRecipe';

function RecipeInProgress({
  match: { params: { id }, path },
  recipe,
  dispatchFetchRecipe,
}) {
  React.useEffect(() => {
    const type = path.replace(/(^\/)|(\/)(:|\w|-)+/g, '');
    dispatchFetchRecipe(type, id);
  }, [dispatchFetchRecipe, id, path]);

  const details = {
    strThumb: recipe.strDrinkThumb || recipe.strMealThumb,
    str: recipe.strDrink || recipe.strMeal,
    strCategory: recipe.strCategory,
    strInstructions: recipe.strInstructions,
  };

  const getIngredients = () => {
    const ingredientsCount = 20;
    const ingredientsList = [];

    for (let index = 1; index <= ingredientsCount; index += 1) {
      const ingredient = recipe[`strIngredient${index}`];
      const measure = recipe[`strMeasure${index}`];

      if (recipe[`strIngredient${index}`] && recipe[`strIngredient${index}`].length > 0) {
        ingredientsList.push([ingredient, measure]);
      } else break;
    }

    return ingredientsList;
  };

  return (
    <main data-testid="recipes-page">
      <img src={ details.strThumb } alt="" data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">{ details.str }</h1>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <p data-testid="recipe-category">{ details.strCategory }</p>
      <ul>
        {
          getIngredients().map(([ingredient, measure], index) => (
            <li key={ ingredient } data-testid={ `${index}-ingredient-step` }>
              { `${ingredient} - ${measure}` }
            </li>
          ))
        }
      </ul>
      <p data-testid="instructions">
        { details.strInstructions }
      </p>
      <button type="button" data-testid="finish-recipe-btn">Finalizar</button>
    </main>
  );
}

const mapStateToProps = ({ selectedRecipeReducer: { recipe } }) => ({
  recipe,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchRecipe: (type, id) => dispatch(fetchRecipeDetail(type, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeInProgress);

RecipeInProgress.defaultProps = {
  recipe: {},
};

RecipeInProgress.propTypes = {
  dispatchFetchRecipe: PropTypes.func,
}.isRequired;