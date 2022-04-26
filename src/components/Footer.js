import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/footer.css';

function Footer() {
  const history = useHistory();

  function handleClick(path) {
    history.push(path);
  }

  return (
    <footer
      className="footer"
      data-testid="footer"
    >
      <button
        type="button"
        onClick={ () => handleClick('/bebidas') }
      >
        <img
          src={ drinkIcon }
          alt="Link para bebidas"
          data-testid="drinks-bottom-btn"
        />
      </button>
      <button
        type="button"
        onClick={ () => handleClick('/explorar') }
      >
        <img
          src={ exploreIcon }
          alt="Link para explorar"
          data-testid="explore-bottom-btn"
        />
      </button>
      <button
        type="button"
        onClick={ () => handleClick('/comidas') }
      >
        <img
          src={ mealIcon }
          alt="Link para comidas"
          data-testid="food-bottom-btn"
        />
      </button>
    </footer>
  );
}

export default Footer;
