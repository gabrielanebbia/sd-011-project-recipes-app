import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchHeaderSearch } from '../../actions';

class IngredientCard extends Component {
  constructor() {
    super();

    this.handleIngredientClick = this.handleIngredientClick.bind(this);
  }

  handleIngredientClick() {
    const { history, typeRecipe, ingredientName, dispatchIngredient } = this.props;

    history.push(`/${typeRecipe}`);
    dispatchIngredient(typeRecipe, 'ingrediente', ingredientName);
  }

  render() {
    const { index, ingredientName, typeRecipe } = this.props;

    const imageSrc = typeRecipe === 'comidas'
      ? `https://www.themealdb.com/images/ingredients/${ingredientName}-Small.png`
      : `https://www.thecocktaildb.com/images/ingredients/${ingredientName}-Small.png`;

    return (
      <section>
        <button
          type="button"
          onClick={ this.handleIngredientClick }
          data-testid={ `${index}-ingredient-card` }
        >
          <img
            src={ imageSrc }
            alt={ ingredientName }
            width="200px"
            data-testid={ `${index}-card-img` }
          />
          <h1 data-testid={ `${index}-card-name` }>{ ingredientName }</h1>
        </button>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchIngredient:
  (type, filter, keyWord) => dispatch(fetchHeaderSearch(type, filter, keyWord)),
});

IngredientCard.propTypes = {
  index: PropTypes.number,
  ingredientName: PropTypes.string,
  typeRecipe: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  dispatchIngredient: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(withRouter(IngredientCard));
