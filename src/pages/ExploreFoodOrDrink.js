import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchRandomRecipe } from '../actions';

function ExploreFoodOrDrink({ history, dispatchFetchRandomRecipe, randomRecipe }) {
  useEffect(() => {
    if (history.location.pathname === '/explorar/comidas') {
      dispatchFetchRandomRecipe('comidas');
    } else {
      dispatchFetchRandomRecipe('bebidas');
    }
  }, [history.location.pathname, dispatchFetchRandomRecipe]);

  function exploreFood() {
    return (
      <>
        <Header withSearch={ false } pageTitle="Explorar Comidas" />
        <main data-testid="recipes-page">
          <h1>Tela de Explorar Comidas</h1>
          <section>
            <button
              type="button"
              onClick={ () => history.push('/explorar/comidas/ingredientes') }
              data-testid="explore-by-ingredient"
            >
              Por Ingredientes
            </button>
          </section>
          <section>
            <button
              type="button"
              onClick={ () => history.push('/explorar/comidas/area') }
              data-testid="explore-by-area"
            >
              Por Local de Origem
            </button>
          </section>
          <section>
            <button
              type="button"
              onClick={ () => history.push(`/comidas/${randomRecipe}`) }
              data-testid="explore-surprise"
            >
              Me Surpreenda!
            </button>
          </section>
        </main>
      </>
    );
  }

  function exploreDrink() {
    return (
      <>
        <Header withSearch={ false } pageTitle="Explorar Bebidas" />
        <main data-testid="recipes-page">
          <h1>Tela de Explorar Bebidas</h1>
          <section>
            <button
              type="button"
              onClick={ () => history.push('/explorar/bebidas/ingredientes') }
              data-testid="explore-by-ingredient"
            >
              Por Ingredientes
            </button>
          </section>
          <section>
            <button
              type="button"
              onClick={ () => history.push(`/bebidas/${randomRecipe}`) }
              data-testid="explore-surprise"
            >
              Me Surpreenda!
            </button>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      {history.location.pathname === '/explorar/comidas' && exploreFood()}
      {history.location.pathname === '/explorar/bebidas' && exploreDrink()}

      <Footer />
    </>
  );
}

const mapStateToProps = ({
  recipeRandomReducer: { randomRecipe, loading, error },
}) => ({
  randomRecipe,
  loading,
  error,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchRandomRecipe: (type) => dispatch(fetchRandomRecipe(type)),
});

ExploreFoodOrDrink.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    randomRecipe: PropTypes.arrayOf(PropTypes.object),
    dispatchFetchRandomRecipe: PropTypes.func,
  }),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExploreFoodOrDrink);
