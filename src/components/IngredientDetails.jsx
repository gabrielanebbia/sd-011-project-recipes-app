import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';
import '../styles/carousel.css';

function IngredientDetails({ inProcess, food, drink }) {
  const { idDetails, toggle, getAndSetLocalStorage } = useContext(AppContext);
  console.log(idDetails[0]);

  useEffect(() => {
    getAndSetLocalStorage(inProcess, food);
  }, []);

  const ingredients = Object.keys(idDetails[0])
    .filter((el) => el.includes('strIngredient'));
  const measure = Object.keys(idDetails[0]).filter((el) => el.includes('strMeasure'));

  const ingredientList = ingredients
    .filter((el) => idDetails[0][el])
    .map((ing, index) => `${idDetails[0][ing]} - ${idDetails[0][measure[index]]}`.trim());

  console.log(ingredientList);

  return (
    <>
      <h3>Ingredients</h3>
      <ul>
        {ingredientList && ingredientList
          .map((item, index) => (
            <li
              style={ { listStyle: 'none' } }
              key={ index }
              data-testid={ inProcess
                ? `${index}-ingredient-step`
                : `${index}-ingredient-name-and-measure` }
            >
              {inProcess
                ? (
                  <label id={ index } htmlFor={ item } className={ item }>
                    <input
                      id={ item }
                      type="checkbox"
                      value={ index }
                      onClick={ (e) => toggle(e, drink) }
                    />
                    {item}
                  </label>) : item }
            </li>))}
      </ul>
      <h3>Instructions</h3>
      <p data-testid="instructions">{idDetails[0].strInstructions}</p>
    </>
  );
}

export default IngredientDetails;

IngredientDetails.propTypes = {
  food: PropTypes.bool.isRequired,
  drink: PropTypes.bool.isRequired,
  inProcess: PropTypes.bool.isRequired,
};