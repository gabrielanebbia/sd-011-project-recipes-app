import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class RecipeCard extends React.Component {
  constructor() {
    super();

    this.handleRecipeClick = this.handleRecipeClick.bind(this);
  }

  handleRecipeClick() {
    const { history, type, recipe } = this.props;
    const id = recipe.idMeal || recipe.idDrink;
    history.push(`/${type}/${id}`);
  }

  render() {
    const { index, recipe } = this.props;

    const imageSrc = recipe.strMealThumb || recipe.strDrinkThumb;
    const recipeName = recipe.strMeal || recipe.strDrink;

    return (
      <section>
        <button
          type="button"
          onClick={ this.handleRecipeClick }
          data-testid={ `${index}-recipe-card` }
        >
          <img
            src={ imageSrc }
            alt={ recipeName }
            width="200px"
            data-testid={ `${index}-card-img` }
          />
          <h1 data-testid={ `${index}-card-name` }>{recipeName}</h1>
        </button>
      </section>
    );
  }
}

const mapStateToProps = ({ recipesCategoriesReducer: { type } }) => ({
  type,
});

export default connect(mapStateToProps)(withRouter(RecipeCard));

RecipeCard.propTypes = {
  index: PropTypes.number,
  recipe: PropTypes.objectOf(PropTypes.string),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  type: PropTypes.string,
}.isRequired;
