import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFromStorage, setToStorage } from '../../helpers/utils';
import { updateFavoriteRecipes } from '../../actions/favoriteRecipes';
import WhiteHeartIcon from '../../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../../images/blackHeartIcon.svg';

const recipeId = window.location.pathname.replace(/[^\d]/g, '');
const mealUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
const drinkUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`;

class FavoriteButton extends React.Component {
  constructor() {
    super();

    this.state = {
      isFavorite: false,
      recipe: {},
    };

    this.handleFavorite = this.handleFavorite.bind(this);
  }

  componentDidMount() {
    this.isFavorite();
    this.fetchRecipe();
  }

  handleFavorite() {
    const { isFavorite } = this.state;

    if (isFavorite) this.removeFromFavorites();
    else this.addToFavorites();
  }

  handleFavoriteUpdate(updatedFavoriteRecipes) {
    const { dispatchUpdateFavorites } = this.props;

    setToStorage('favoriteRecipes', updatedFavoriteRecipes);
    this.toggleState('isFavorite');
    dispatchUpdateFavorites(updatedFavoriteRecipes);
  }

  removeFromFavorites() {
    const { recipe } = this.props;
    const favoriteRecipes = getFromStorage('favoriteRecipes');

    const updatedFavoriteRecipes = favoriteRecipes
      .filter(({ id }) => id !== recipe.id || recipeId);

    this.handleFavoriteUpdate(updatedFavoriteRecipes);
  }

  async addToFavorites() {
    const { recipe } = this.state;
    const favoriteRecipes = getFromStorage('favoriteRecipes') || [];

    const updatedFavoriteRecipes = [...favoriteRecipes, recipe];

    this.handleFavoriteUpdate(updatedFavoriteRecipes);
  }

  toggleState(state) {
    this.setState((previousState) => ({
      [state]: !previousState[state],
    }));
  }

  isFavorite() {
    const { recipe } = this.props;
    const favoriteRecipes = getFromStorage('favoriteRecipes') || [];

    this.setState({
      isFavorite: favoriteRecipes.some(({ id }) => id === recipe.id || recipeId),
    });
  }

  async fetchRecipe() {
    let { recipe } = this.props;

    if (Object.keys(recipe).length === 0) {
      const type = window.location.pathname.includes('comidas') ? 'comida' : 'bebida';
      const url = type === 'comida' ? mealUrl : drinkUrl;

      const fetchedRecipe = await fetch(url)
        .then((response) => response.json())
        .then((data) => (type === 'comida' ? data.meals[0] : data.drinks[0]));

      recipe = {
        id: recipeId,
        type,
        area: fetchedRecipe.strArea || '',
        category: fetchedRecipe.strCategory || '',
        alcoholicOrNot: fetchedRecipe.strAlcoholic || '',
        name: type === 'comida'
          ? fetchedRecipe.strMeal
          : fetchedRecipe.strDrink,
        image: type === 'comida'
          ? fetchedRecipe.strMealThumb
          : fetchedRecipe.strDrinkThumb,
      };
    }

    this.setState({
      recipe,
    });
  }

  render() {
    const { id, dataTestId } = this.props;
    const { isFavorite } = this.state;

    return (
      <button type="button" onClick={ () => this.handleFavorite(id) }>
        <img
          src={ isFavorite ? BlackHeartIcon : WhiteHeartIcon }
          alt="Favoritar"
          data-testid={ dataTestId }
        />
      </button>
    );
  }
}

const mapStateToProps = ({ favoriteRecipesReducer: { favoriteRecipes } }) => ({
  favoriteRecipes,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchUpdateFavorites:
    (favoriteRecipes) => dispatch(updateFavoriteRecipes(favoriteRecipes)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteButton);

FavoriteButton.defaultProps = {
  recipe: {},
};

FavoriteButton.propTypes = {
  favoriteRecipes: PropTypes.arrayOf(PropTypes.object),
  dispatchUpdateFavorites: PropTypes.func,
  dataTestId: PropTypes.string,
}.isRequired;
