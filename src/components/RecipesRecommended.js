import React from 'react';
import PropTypes from 'prop-types';
import { getXFirstElementsFromArray } from '../helpers/utils';
import '../index.css';

const DECREMENT = -1;
const INCREMENT = 1;
const INDEX = 5;

class RecipesRecommended extends React.Component {
  constructor() {
    super();

    this.state = {
      slideIndex: 0,
    };

    this.getCarouselElements = this.getCarouselElements.bind(this);
    this.renderCarouselElements = this.renderCarouselElements.bind(this);
  }

  getCarouselElements() {
    const { recipesRecommended } = this.props;
    const { slideIndex } = this.state;

    return getXFirstElementsFromArray(recipesRecommended, INDEX + 1)
      .map((item, index) => (
        <div
          data-testid={ `${index}-recomendation-card` }
          className="card"
          key={ index }
          hidden={ !(index === slideIndex || index === slideIndex + 1)
            && !(slideIndex === INDEX && index === 0) }
        >
          <div className="numbertext">
            {`${index + 1} / 6`}
          </div>
          <img
            src={ item.strMealThumb || item.strDrinkThumb }
            style={ { width: '100%' } }
            alt="Recomendadação"
          />
          <div
            data-testid={ `${index}-recomendation-title` }
            className="text"
          >
            { item.strMeal || item.strDrink }
          </div>
        </div>
      ));
  }

  showSlides(n) {
    const { slideIndex } = this.state;

    if (n === DECREMENT) {
      if (slideIndex === 0) {
        this.setState(() => ({
          slideIndex: 5,
        }));
      } else {
        this.setState((prev) => ({
          slideIndex: prev.slideIndex - 1,
        }));
      }
    }
    if (n === INCREMENT) {
      if (slideIndex === INDEX) {
        this.setState(() => ({
          slideIndex: 0,
        }));
      } else {
        this.setState((prev) => ({
          slideIndex: prev.slideIndex + n,
        }));
      }
    }
  }

  renderCarouselElements() {
    const { slideIndex } = this.state;
    return slideIndex === INDEX
      ? this.getCarouselElements().reverse()
      : this.getCarouselElements();
  }

  render() {
    return (
      <div className="container">
        <h3> Recomendadas </h3>
        <div className="slideshow-container" ref={ this.slides }>
          <br />
          { this.renderCarouselElements()}
        </div>
        <br />
        <button
          className="prev"
          type="button"
          aria-label="botões de transição"
          onClick={ () => this.showSlides(DECREMENT) }
          onKeyDown={ () => this.showSlides(DECREMENT) }
        >
          &#10094;
        </button>
        <button
          className="next"
          type="button"
          aria-label="botões de transição"
          onClick={ () => this.showSlides(INCREMENT) }
          onKeyDown={ () => this.showSlides(INCREMENT) }
        >
          &#10095;
        </button>
      </div>
    );
  }
}

export default RecipesRecommended;

RecipesRecommended.propTypes = {
  recipesRecommended: PropTypes.arrayOf(PropTypes.object),
}.isRequired;
