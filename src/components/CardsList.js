import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RecipeCard from './RecipeCard';
import { getXFirstElementsFromArray } from '../helpers/utils';

class CardList extends Component {
  constructor() {
    super();
    this.renderCards = this.renderCards.bind(this);
  }

  renderCards() {
    const { recipes, recipesHeaderSearch, recipesQuantity } = this.props;

    if (recipesHeaderSearch.length > 0) {
      return getXFirstElementsFromArray(recipesHeaderSearch, recipesQuantity)
        .map((recipe, index) => (
          <RecipeCard key={ index } index={ index } recipe={ recipe } />
        ));
    }
    return recipes.map((recipe, index) => (
      <RecipeCard key={ index } index={ index } recipe={ recipe } />
    ));
  }

  render() {
    return this.renderCards();
  }
}

CardList.propTypes = {
  recipesHeaderSearch: PropTypes.arrayOf(PropTypes.object),
  recipes: PropTypes.arrayOf(PropTypes.object),
  recipesQuantity: PropTypes.number,

}.isRequired;

export default CardList;
