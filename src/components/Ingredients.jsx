import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function Ingredients(props) {
  const { ingredients, finishRecipe, measures, id, food } = props;
  const [numberOfIngredients, setNumberOfIngredients] = useState(0);

  function verifyInProgress() {
    let progress = {
      cocktails: {},
      meals: {},
    };
    if (localStorage.getItem('inProgressRecipes')) {
      progress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    }
    let ingredientsArr = [];
    if (food) {
      ingredientsArr = progress.meals[id];
    } else {
      ingredientsArr = progress.cocktails[id];
    }
    if (!ingredientsArr) {
      ingredientsArr = [];
    }
    const inputArr = Array.from(document.getElementsByTagName('input'));
    console.log(inputArr);
    inputArr.forEach((input) => {
      if (ingredientsArr.includes(input.name)) {
        console.log(input.name);
        input.checked = true;
      }
    });
  }

  useEffect(() => {
    const eigth = 8;
    const three = 3;
    if (food) {
      setNumberOfIngredients(eigth);
    } else {
      setNumberOfIngredients(three);
    }
    verifyInProgress();
  }, []);

  function setInProgress() {
    let progress = {
      cocktails: {},
      meals: {},
    };
    if (localStorage.getItem('inProgressRecipes')) {
      progress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    }
    const inputArr = Array.from(document.getElementsByTagName('input'));
    const checkedIngredients = [];
    inputArr.forEach((input) => {
      if (input.checked) {
        checkedIngredients.push(input.name);
      }
    });
    if (!food) {
      progress.cocktails[id] = checkedIngredients;
    } else {
      progress.meals[id] = checkedIngredients;
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(progress));
  }

  // const newIngredients = [{ name: 'ovo', checked: false}]

  // function setMarked(id) {
  //   const checkedIngredients = newIngredients.map((ingredient, index) => {
  //     if (index === id) {
  //       ingredient.checked = !ingredient.checked;
  //       return ingredient;
  //     }
  //     return ingredient;
  //   });
  // }

  return (
    <div>
      <h3>Ingredients</h3>
      { ingredients.length > 0 && ingredients.map((ing, index) => (
        index < numberOfIngredients && (
          <div key={ index } data-testid={ `${index}-ingredient-step` }>
            <input
              type="checkbox"
              name={ ing[1] }
              onChange={ () => { finishRecipe(); setInProgress(); } }
            />
            <span>{ `${ing[1]} - ${measures[index][1]}` }</span>
          </div>
        ))) }
    </div>
  );
}

Ingredients.propTypes = {
  ingredients: PropTypes.arrayOf,
  finishRecipe: PropTypes.func,
  measures: PropTypes.arrayOf,
}.isRequired;
