import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getXFirstElementsFromArray } from '../../helpers/utils';
import ShareButton from '../ShareButton';

class RecipeDoneCard extends React.Component {
  render() {
    const { recipe, count } = this.props;
    const detailPage = `/${recipe.type}s/${recipe.id}`;

    return (
      <section>
        <section>
          <Link to={ detailPage }>
            <img
              src={ recipe.image }
              alt={ recipe.name }
              width="200px"
              data-testid={ `${count}-horizontal-image` }
            />
          </Link>
        </section>
        <section>
          <p data-testid={ `${count}-horizontal-top-text` }>
            {
              recipe.type === 'comida'
                ? `${recipe.area} - ${recipe.category}`
                : recipe.alcoholicOrNot
            }
          </p>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <h1 data-testid={ `${count}-horizontal-name` }>
              { recipe.name }
            </h1>
          </Link>
          <p data-testid={ `${count}-horizontal-done-date` }>
            { `Feita em: ${recipe.doneDate}` }
          </p>
          <ShareButton
            dataTestId={ `${count}-horizontal-share-btn` }
            testLocation="img"
            url={ `${window.location.origin}${detailPage}` }
          />
          <section>
            {
              getXFirstElementsFromArray(recipe.tags, 2).map((tag, index) => (
                <span key={ index } data-testid={ `${count}-${tag}-horizontal-tag` }>
                  { tag }
                </span>
              ))
            }
          </section>
        </section>
      </section>
    );
  }
}

export default RecipeDoneCard;

RecipeDoneCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number,
    image: PropTypes.string,
    name: PropTypes.string,
    category: PropTypes.string,
    doneDate: PropTypes.number,
    tags: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
  }),
  count: PropTypes.number,
}.isRequired;
