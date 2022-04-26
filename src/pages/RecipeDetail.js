import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchRecipeDetail, fetchRecommended } from '../actions/recipeDetail_actions';
import RecipeDetailMain from '../components/RecipeDetailMain';
import RecipesRecommended from '../components/RecipesRecommended';
import '../index.css';
import { getFromStorage, setToStorage } from '../helpers/utils';

function RecipeDetail({ history: { push, location: { pathname } },
  dispatchFetchDetail, dispatchFetchRecommended, recipeDetail, recipesRecommended }) {
  const { id } = useParams();
  const type = pathname.includes('comidas') ? 'comidas' : 'bebidas';

  function verifyRecipeInProgress() {
    const inProgressRecipes = getFromStorage('inProgressRecipes') || [];
    return Object.prototype.hasOwnProperty.call(inProgressRecipes, id);
  }

  const addStepToStorage = () => {
    const recipesInProgress = getFromStorage('inProgressRecipes') || {};
    const updatedItem = {
      ...recipesInProgress,
      [id]: [],
    };
    setToStorage('inProgressRecipes', updatedItem);
  };

  React.useEffect(addStepToStorage, [id]);

  React.useEffect(() => {
    dispatchFetchRecommended(type);
  }, [dispatchFetchRecommended, type]);

  React.useEffect(() => {
    dispatchFetchDetail(type, id);
  }, [dispatchFetchDetail, type, id]);

  function verifyRecipeDone() {
    const recipesDone = getFromStorage('doneRecipes') || [];
    return recipesDone.some((item) => (item.id === id));
  }

  function redrectToRecipeInProgress() {
    push(`${pathname}/in-progress`);
  }

  function handleStartContinueBtn() {
    redrectToRecipeInProgress();
  }

  return (
    <div className="recipe-detail">
      <RecipeDetailMain
        recipeDetail={ recipeDetail }
        id={ id }
        type={ type }
      />
      <RecipesRecommended recipesRecommended={ recipesRecommended } />
      <button
        data-testid="start-recipe-btn"
        className="fixedBottom"
        type="button"
        onClick={ handleStartContinueBtn }
        hidden={ verifyRecipeDone() }
      >
        { verifyRecipeInProgress() ? 'Continuar Receita' : 'Iniciar receita'}
      </button>
    </div>
  );
}

const mapStateToProps = ({ recipeDetailReducer,
  recommendedsReducer, selectedRecipeReducer: { inProgress } }) => ({
  recipeDetail: recipeDetailReducer.detail,
  recipesRecommended: recommendedsReducer.recommended,
  inProgress,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchDetail: (type, id) => dispatch(fetchRecipeDetail(type, id)),
  dispatchFetchRecommended: (type) => dispatch(fetchRecommended(type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetail);

RecipeDetail.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    push: PropTypes.func,
  }),
  recipeDetail: PropTypes.object,
  dispatchFetchDetail: PropTypes.func,
  dispatchFetchRecommended: PropTypes.func,
  recipesRecommended: PropTypes.arrayOf(PropTypes.object),
}.isRequired;
