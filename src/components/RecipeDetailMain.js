import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { getFromStorage, setToStorage } from '../helpers/utils';
import ShareButton from './ShareButton';

class RecipeDetailMain extends Component {
  constructor() {
    super();

    this.state = {
      favoriteBtnSrc: whiteHeartIcon,
    };

    this.main = this.main.bind(this);
    this.handleFavoriteBtn = this.handleFavoriteBtn.bind(this);
    this.changeFavoriteBtn = this.changeFavoriteBtn.bind(this);
    this.addToLocalStorage = this.addToLocalStorage.bind(this);
    this.removeFromLocalStorage = this.removeFromLocalStorage.bind(this);
  }

  componentDidMount() {
    this.changeFavoriteBtn();
  }

  handleFavoriteBtn() {
    const { favoriteBtnSrc } = this.state;
    if (favoriteBtnSrc === whiteHeartIcon) {
      this.addToLocalStorage();
      this.setState({
        favoriteBtnSrc: blackHeartIcon,
      });
    } else {
      this.removeFromLocalStorage();
      this.setState({
        favoriteBtnSrc: whiteHeartIcon,
      });
    }
  }

  addToLocalStorage() {
    const { id, type, recipeDetail: { strArea, strCategory,
      strAlcoholic, strDrink, strMeal, strMealThumb, strDrinkThumb } } = this.props;

    const favoriteRecipes = getFromStorage('favoriteRecipes') || [];
    const newFavoriteRecipe = [
      ...favoriteRecipes,
      {
        id,
        type: type.replace('s', ''),
        area: strArea || '',
        category: strCategory || '',
        alcoholicOrNot: strAlcoholic || '',
        name: strMeal || strDrink,
        image: strDrinkThumb || strMealThumb,
      },
    ];
    setToStorage('favoriteRecipes', newFavoriteRecipe);
  }

  removeFromLocalStorage() {
    const { id } = this.props;
    const favoriteRecipes = getFromStorage('favoriteRecipes') || [];
    const newFavoriteRecipe = favoriteRecipes.filter((item) => (item.id !== id));

    setToStorage('favoriteRecipes', newFavoriteRecipe);
  }

  changeFavoriteBtn() {
    const { id } = this.props;
    const favoriteRecipes = getFromStorage('favoriteRecipes') || [];
    const hasId = favoriteRecipes.some((item) => (item.id === id));
    if (hasId) {
      this.setState({
        favoriteBtnSrc: blackHeartIcon,
      });
    } else {
      this.setState({
        favoriteBtnSrc: whiteHeartIcon,
      });
    }
  }

  main(recipeDetail) {
    const { favoriteBtnSrc } = this.state;
    const { strMealThumb, strDrinkThumb, strDrink, strMeal,
      strCategory, strAlcoholic, strInstructions,
      strYoutube } = recipeDetail;

    const strThumb = strDrinkThumb || strMealThumb;
    const str = strMeal || strDrink;
    const category = strAlcoholic || strCategory;

    const strYoutubeEmbed = strYoutube && strYoutube.replace('watch?v=', 'embed/');

    let count = 1;

    const ingredientes = recipeDetail && Object.keys(recipeDetail)
      .filter((item) => {
        if (item === `strIngredient${count}` && recipeDetail[item]) {
          count += 1;
          return true;
        }
        return false;
      }).map((item, index) => {
        if (recipeDetail[item]) {
          const strIngredient = `${recipeDetail[`strIngredient${index + 1}`]} - `;
          const strMeasure = `${recipeDetail[`strMeasure${index + 1}`]}`;
          return [strIngredient, strMeasure].join('');
        }
        return null;
      });

    return (
      <main data-testid="recipes-page" className="detailMain">
        <br />
        <img data-testid="recipe-photo" alt="meal recipe" src={ strThumb } />
        <br />
        <h2 data-testid="recipe-title">{ str }</h2>
        <br />
        <ShareButton
          dataTestId="share-btn"
          testLocation="button"
          url={ window.location.href }
        />
        &nbsp;  &nbsp;
        <button
          type="button"
          onClick={ () => this.handleFavoriteBtn() }
          aria-label="Botão de favoritar"
        >
          <img
            data-testid="favorite-btn"
            alt="Imagem do botão de favoritar"
            src={ favoriteBtnSrc }
          />
        </button>
        <br />
        <br />
        <h4 data-testid="recipe-category">{ category }</h4>
        <br />
        <br />
        <h3> Ingredientes</h3>
        <ul name="ingredients-list">
          <br />
          {ingredientes.map((ingred, index) => (
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ index }
            >
              { ingred }
            </li>))}
        </ul>
        <br />
        <br />
        <div data-testid="instructions">
          <h3> Instruções</h3>
          <br />
          { strInstructions }
          <br />
        </div>
        <br />
        {strYoutube
        && (
          <div>
            <h3> Video </h3>
            <br />
            <iframe
              data-testid="video"
              width="853"
              height="480"
              src={ strYoutubeEmbed }
              title="Embedded youtube"
            />
            <br />
          </div>
        )}
        <br />
        <br />
      </main>
    );
  }

  render() {
    const { recipeDetail } = this.props;
    return (
      <div>
        { this.main(recipeDetail) }
      </div>
    );
  }
}

export default withRouter(RecipeDetailMain);

RecipeDetailMain.propTypes = {
  recipeDetail: PropTypes.object,
  id: PropTypes.string,
  type: PropTypes.string,
}.isRequired;
