import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FavoriteButton from '../FavoriteButton';
import ShareButton from '../ShareButton';

class FavoriteRecipeCard extends React.Component {
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
          <ShareButton
            dataTestId={ `${count}-horizontal-share-btn` }
            testLocation="img"
            url={ `${window.location.origin}${detailPage}` }
          />
          <FavoriteButton
            recipe={ recipe }
            dataTestId={ `${count}-horizontal-favorite-btn` }
          />
        </section>
      </section>
    );
  }
}

export default FavoriteRecipeCard;

FavoriteRecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number,
    image: PropTypes.string,
    name: PropTypes.string,
    category: PropTypes.string,
    type: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
  }),
  count: PropTypes.number,
}.isRequired;
