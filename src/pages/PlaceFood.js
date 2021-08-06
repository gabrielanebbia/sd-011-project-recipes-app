import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { getArea, getMealsByArea, getRecomendation } from '../services/RequestRandom';

function PlaceFood() {
  const [options, setOptions] = useState([]);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    getArea().then((response) => {
      setOptions(response);
    });
    getRecomendation().then((data) => {
      setMeals(data);
    });
  }, []);
  console.log(options);
  console.log(meals);

  function mealsByArea(event) {
    if (event.target.value === 'All') {
      getRecomendation().then((data) => {
        setMeals(data);
      });
    } else {
      getMealsByArea(event.target.value).then((data) => {
        setMeals(data);
      });
    }
  }

  return (
    <div>
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ mealsByArea }
      >
        <option
          value="All"
          data-testid="All-option"
        >
          All
        </option>
        {options.map((option, index) => (
          <option
            data-testid={ `${option.strArea}-option` }
            value={ option.strArea }
            key={ index }
          >
            {option.strArea}
          </option>
        ))}
      </select>
      {meals.slice(0, Number('12')).map((meal, index) => (
        <Link
          to={ `/comidas/${meal.idMeal}` }
          key={ meal.idMeal }
        >
          <div data-testid={ `${index}-recipe-card` }>
            <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
            <img
              style={ { width: 80 } }
              data-testid={ `${index}-card-img` }
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
            />
          </div>
        </Link>
      ))}
      <Footer />
    </div>
  );
}

export default PlaceFood;
