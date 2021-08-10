import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchByFilter from '../services/data';
// import { SearchBarContext } from '../context/SearchBar';
import { Redirect } from 'react-router-dom';

/* Criei CardsList para renderizar apenas uma vez. Deixei apenas o SearchBarProvider encapsulando o Header e CardsList, já que buscam as mesmas informações */

export default function CardsListByIngredient() {
  const [ingredName, setIngredName] = useState([]);
  const [imge, setImge] = useState([]);
  const [redirectTo, setRedirectTo] = useState(false);
  const path = window.location.pathname.split('/')[2];

  // const { setCheck, setIngred } = useContext(SearchBarContext);

  useEffect(() => {
    const urlDrink = 'thecocktaildb';
    const urlMeal = 'themealdb';
    let url = urlMeal;
    if (path === 'bebidas') {
      url = urlDrink;
    }
    const getRecipes = async () => {
      const urlToFetch = `https://www.${url}.com/api/json/v1/1/list.php?i=list`;
      const recipesFromApi = await fetchByFilter(urlToFetch);
      const recipesList = Object.values(recipesFromApi)[0];
      if (path === 'bebidas') {
        const array = recipesList.map((e) => (e.strIngredient1));
        return setIngredName(array);
      }
      const array = recipesList.map((e) => (e.strIngredient));
      return setIngredName(array);
      // setDataValues(recipesList);
      // setDataList(recipesList);
      // setShouldCallCards(true);
    };

    getRecipes();
  }, [path]);

  useEffect(() => {
    const urlDrink = 'thecocktaildb';
    const urlMeal = 'themealdb';
    let url = urlMeal;
    if (path === 'bebidas') {
      url = urlDrink;
    }

    const getCategories = async () => {
      const img = ingredName.map((e) => ({
        fig: `https://www.${url}.com/images/ingredients/${e}-Small.png`,
        name: `${e}`,
      }));
      const magicN = 12;
      const imgTwelve = img.slice(0, magicN);
      setImge(imgTwelve);
      // const categoriesFromApi = await fetchByFilter(urlToFetch);
      // const categoriesList = Object.values(categoriesFromApi)[0];
    };

    getCategories();
  }, [path, ingredName]);

  const handleClick = (value) => {
    // setIngred(value);
    // setCheck('checked');
    setRedirectTo(true);
  }

  return (
    <div style={ { position: 'relative' } }>
      { imge.map((e, i) => (
        <button
          style={ {
            borderRadius: '5px',
            margin: '10px 10px 0 10px',
            width: '100%',
            background: 'orange',
            opacity: 'none',
            border: '1px solid black',
          } }
          type="button"
          key={ i }
        >
          <div data-testid={ `${i}-ingredient-card` } onClick={ () => handleClick(e.name) }>
            <img
              src={ e.fig }
              alt={ `figure ${e.name}` }
              data-testid={ `${i}-card-img` }
            />
            <p data-testid={ `${i}-card-name` }>{e.name}</p>
          </div>
        </button>
      )) }
      { redirectTo && <Redirect to={`/${path}`} /> }
    </div>
  );
}

CardsListByIngredient.propTypes = {
  fetchType: PropTypes.string,
}.isRequired;
