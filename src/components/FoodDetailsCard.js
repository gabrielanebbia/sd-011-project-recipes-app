import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShareBtn from './FavoriteBtn';
import FavoriteBtn from './ShareBtn';
import FetchApi from '../services/ApiFetch';
import FoodCarrossel from './FoodCarrossel';

function FoodDetailsCard({ details, mealIngredients, mealMeasure, id }) {
  const history = useHistory();
  const [recomendation, setRecomendation] = useState();
  const [doneRecipe] = useState(false);

  useEffect(() => {
    async function getRecomendations() {
      const qty = 6;
      const response = await FetchApi('thecocktaildb', 'nome', '');
      const recomendationsList = response.drinks.slice(0, qty);
      setRecomendation(recomendationsList);
    }
    getRecomendations();
  }, []);

  function renderDetails() {
    return (
      <div className="details-body">
        <img
          alt="logo"
          src={ details[0].strMealThumb }
          data-testid="recipe-photo"
          width="350px"
          height="300px"
        />
        <h3 data-testid="recipe-title">{ details[0].strMeal }</h3>
        <div className="details-btn-container">
          <ShareBtn />
          <FavoriteBtn />
        </div>
        <h4 data-testid="recipe-category">
          Category:
          { details[0].strCategory }
        </h4>
        <h4>Ingredients:</h4>
        { mealIngredients ? mealIngredients.map((item, index) => (
          <h5
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            { `${item} - ${mealMeasure[index]}` }
          </h5>
        )) : '' }
        <h4>Instructions:</h4>
        <p data-testid="instructions">{ details[0].strInstructions }</p>
        <h4>Vídeo</h4>
        { details ? <iframe
          width="355"
          height="320"
          data-testid="video"
          src={ `https://www.youtube.com/embed/${details[0].strYoutube.split('=')[1]}` }
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write;
          encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        /> : '' }
        <FoodCarrossel recomendation={ recomendation } />
        {
          doneRecipe ? '' : (
            <button
              type="button"
              data-testid="start-recipe-btn"
              onClick={ () => history.push(`/comidas/${id}/in-progress`) }
              style={ { position: 'fixed',
                bottom: '0px',
                marginLeft: '60px' } }
            >
              Iniciar Receita
            </button>)
        }
      </div>
    );
  }
  return (
    <div className="details-container">
      { details ? renderDetails() : 'Loading...'}
    </div>
  );
}

export default FoodDetailsCard;
FoodDetailsCard.propTypes = {
  details: PropTypes.func,
  mealIngredients: PropTypes.func,
  mealMeasure: PropTypes.func,
}.isRequired;
