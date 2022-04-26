import React from 'react';
import PropTypes from 'prop-types';

class RecipeFilters extends React.Component {
  handleFilterSelect(filter) {
    const { setFilter } = this.props;

    setFilter(filter);
  }

  render() {
    return (
      <section>
        <button
          type="button"
          onClick={ () => this.handleFilterSelect('all') }
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          onClick={ () => this.handleFilterSelect('comida') }
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          type="button"
          onClick={ () => this.handleFilterSelect('bebida') }
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </section>
    );
  }
}

export default RecipeFilters;

RecipeFilters.propTypes = {
  setFilter: PropTypes.func,
}.isRequired;
