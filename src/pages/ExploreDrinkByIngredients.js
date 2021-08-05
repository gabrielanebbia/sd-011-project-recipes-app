import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

export default function ExploreDrinkByIngredients() {
  const pageTitle = {
    pageName: 'Explorar Ingredientes',
    setIcon: false,
  };
  const [ingredients, setIngredients] = useState([]);
  const { setRecipesDb } = useContext(RecipesContext);
  const history = useHistory();
  const limits = 12;
  useEffect(() => {
    const getIngredients = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
        .then((res) => res.json());
      setIngredients(response.drinks);
    };
    getIngredients();
  }, []);

  async function getDrinksFromIngredient(param) {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${param}`);
    const data = await response.json();
    console.log(data);
    setRecipesDb([]);
    return setRecipesDb(data.drinks);
  }

  return (
    <div>
      <Header value={ pageTitle } />
      <div className="card-container">
        {
          ingredients.map((drink, index) => (
            (index < limits) && (
              <button
                name={ drink.strIngredient1 }
                type="button"
                onClick={ ({ target }) => {
                  getDrinksFromIngredient(target.getAttribute('name'));
                  return history.push('/bebidas');
                } }
              >
                <div className="card-style">
                  <div className="card-img" data-testid={ `${index}-ingredient-card` }>
                    <img
                      name={ drink.strIngredient1 }
                      src={ `https://www.thecocktaildb.com/images/ingredients/${drink.strIngredient1}-Small.png` }
                      data-testid={ `${index}-card-img` }
                      alt={ drink.strIngredient1 }
                    />
                  </div>
                  <div name={ drink.strIngredient1 } className="card-title">
                    <span
                      data-testid={ `${index}-card-name` }
                    >
                      { drink.strIngredient1 }
                    </span>
                  </div>
                </div>
              </button>
            )
          ))
        }
      </div>
      <FooterMenu />
    </div>
  );
}
