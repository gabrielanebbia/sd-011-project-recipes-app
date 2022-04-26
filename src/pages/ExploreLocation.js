import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import { fetchRecipes } from '../actions';
import { fetchAreas } from '../actions/areas';
import { getXFirstElementsFromArray } from '../helpers/utils';

function ExploreLocation({
  history,
  dispatchFetchArea,
  dispatchFetchRecipes,
  areas,
  recipes,
  loading,
  error,
}) {
  const [filterArea, setFilterArea] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    dispatchFetchArea();
    dispatchFetchRecipes('meals');
  }, [dispatchFetchArea, dispatchFetchRecipes]);

  useEffect(() => {
    const urlFilterByArea = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${filterArea}`;
    const cardsQuantity = 12;
    fetch(urlFilterByArea)
      .then((response) => response.json())
      .then((data) => (!filterArea ? setFilteredRecipes(recipes)
        : setFilteredRecipes(getXFirstElementsFromArray((data.meals), cardsQuantity))));
  }, [filterArea, recipes]);

  function handleFilterChange({ target }) {
    const { value } = target;
    setFilterArea(value);
  }

  return !loading ? (
    <>
      <Header withSearch pageTitle="Explorar Origem" />
      <main>
        { error && `${error}` }
        <label htmlFor="area">
          <select
            name="area"
            onChange={ handleFilterChange }
            data-testid="explore-by-area-dropdown"
          >
            <option data-testid="All-option" value="">All</option>
            { areas.map(({ strArea: area }, index) => (
              <option data-testid={ `${area}-option` } key={ index }>{ area }</option>
            ))}
          </select>
        </label>
        { filteredRecipes.map((recipe, index) => (
          <section key={ index }>
            <button
              type="button"
              onClick={ () => history.push(`/comidas/${recipe.idMeal}`) }
              data-testid={ `${index}-recipe-card` }
            >
              <img
                src={ recipe.strMealThumb }
                alt={ recipe.strMeal }
                width="200px"
                data-testid={ `${index}-card-img` }
              />
              <h1 data-testid={ `${index}-card-name` }>{recipe.strMeal}</h1>
            </button>
          </section>
        ))}
      </main>
      <Footer />
    </>
  ) : <Loading />;
}

const mapStateToProps = ({
  recipesReducer: { recipes, loading, error },
  areasReducer: { areas },
}) => ({
  recipes,
  areas,
  loading,
  error,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchRecipes: (type) => dispatch(fetchRecipes(type)),
  dispatchFetchArea: () => dispatch(fetchAreas()),
});

ExploreLocation.propTypes = {
  history: PropTypes.shape({
    recipes: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool,
    error: PropTypes.string,
    area: PropTypes.arrayOf(PropTypes.object),
    dispatchFetchRecipes: PropTypes.func,
    dispatchFetchArea: PropTypes.func,
  }),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExploreLocation);
