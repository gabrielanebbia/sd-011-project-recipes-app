import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import * as ReactBootStrap from 'react-bootstrap';
/* import RecipesContext from '../context/RecipesContext'; */
import { fetchFoodDetails } from '../services/API';
import '../styles/FoodsDetails.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import ingredientsMealDetails from '../helpers/ingredientsMealDetails';
import Recomendations from '../components/Recomendations';
import '../styles/Details.css';

function FoodsDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({});
  const history = useHistory();

  useEffect(() => {
    const foodDetails = async (foodId) => {
      const fetchedDetails = await fetchFoodDetails(foodId);
      setDetails(fetchedDetails);
      setLoading(false);
    };
    foodDetails(id);
  }, [id, setLoading]);
  console.log(details);
  const ingredientsAndMeasures = details.idMeal
    ? ingredientsMealDetails(details) : [];

  function videoSrc(youtubeLink) {
    const [partialLink, watchID] = youtubeLink.split('.com/');
    const videoID = watchID.split('?v=')[1];
    return `${partialLink}.com/embed/${videoID}`;
  }

  return (
    <div className="details-container">
      {loading ? <ReactBootStrap.Spinner animation="border" />
        : (
          <>
            <img
              src={ details.strMealThumb }
              alt="Detalhe da comida"
              data-testid="recipe-photo"
            />
            <div>
              <div>
                <span data-testid="recipe-title">{details.strMeal}</span>
                <span data-testid="recipe-category">{details.strCategory}</span>
              </div>
              <div>
                <button type="button" data-testid="share-btn">
                  <img src={ shareIcon } alt="Botão compartilhar" />
                </button>
                <button type="button" data-testid="favorite-btn">
                  <img src={ whiteHeartIcon } alt="Botão favoritar" />
                </button>
              </div>
            </div>
            <div className="ingredients-container">
              <span>Ingredients</span>
              <ul>
                {ingredientsAndMeasures.map((ingredient, index) => (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
            <div className="instructions-container">
              <span>Instruções</span>
              <p data-testid="instructions">{details.strInstructions}</p>
            </div>
            <div className="video-container">
              <span>Video</span>
              <iframe
                data-testid="video"
                width="340"
                height="240"
                src={ videoSrc(details.strYoutube) }
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="recomendation-container">
              <span>Recomendadas</span>
              <Recomendations />
            </div>
            <button
              style={ { position: 'fixed', bottom: 0 } }
              data-testid="start-recipe-btn"
              type="button"
              onClick={ () => history.push(`/comidas/${id}/in-progress`) }
            >
              Iniciar Receita
            </button>
          </>)}
    </div>
  );
}

export default FoodsDetails;