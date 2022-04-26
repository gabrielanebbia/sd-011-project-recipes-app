import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchRecipes } from '../actions';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import RecipesFilterButtons from '../components/RecipesFilterButtons';
import CardsList from '../components/CardsList';

const recipesQuantity = 12;

function Recipes({
  history: { location: { pathname } },
  dispatchFetchRecipes,
  recipes, loading, error,
  recipesHeaderSearch,
}) {
  React.useEffect(() => {
    if (pathname.includes('comidas')) dispatchFetchRecipes('meals');
    else dispatchFetchRecipes('drinks');
  }, [pathname, dispatchFetchRecipes]);

  function renderHeader() {
    return pathname.includes('comidas')
      ? <Header withSearch pageTitle="Comidas" />
      : <Header withSearch pageTitle="Bebidas" />;
  }

  return (
    <>
      { renderHeader() }
      <main data-testid="recipes-page">
        <RecipesFilterButtons pathname={ pathname } />
        { error && `${error}` }
        {
          loading
            ? <Loading />
            : (
              <CardsList
                recipes={ recipes }
                recipesHeaderSearch={ recipesHeaderSearch }
                recipesQuantity={ recipesQuantity }
              />)
        }
      </main>
      <Footer />
    </>
  );
}

const mapStateToProps = ({
  recipesReducer: { recipes, loading, error },
  headerSearchReducer,
}) => ({
  recipes,
  loading,
  error,
  recipesHeaderSearch: headerSearchReducer.recipes,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchRecipes: (type) => dispatch(fetchRecipes(type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);

Recipes.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
  meals: PropTypes.arrayOf(PropTypes.object),
  mealsLoading: PropTypes.bool,
  mealsError: PropTypes.string,
  drinks: PropTypes.arrayOf(PropTypes.object),
  drinksLoading: PropTypes.bool,
  drinksError: PropTypes.string,
  dispatchFetchRecipes: PropTypes.func,
  recipesHeaderSearch: PropTypes.arrayOf(PropTypes.object),
}.isRequired;
