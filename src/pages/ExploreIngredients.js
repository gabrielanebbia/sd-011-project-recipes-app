import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { fetchIngredients } from '../actions/ingredients';
import IngredientCard from '../components/IngredientCard';

function ExploreIngredients({
  history: { location: { pathname } },
  ingredients,
  loading,
  error,
  dispatchFetchIngredients,
}) {
  useEffect(() => {
    if (pathname === '/explorar/comidas/ingredientes') {
      dispatchFetchIngredients('comidas');
    } else {
      dispatchFetchIngredients('bebidas');
    }
  }, [pathname, dispatchFetchIngredients]);

  const typeRecipe = pathname.includes('comidas') ? 'comidas' : 'bebidas';

  return (
    <>
      <Header withSearch={ false } pageTitle="Explorar Ingredientes" />
      <main data-testid="recipes-page">
        { error && `${error}` }
        {
          loading
            ? <Loading />
            : (ingredients && ingredients.map((ingredient, index) => (
              <IngredientCard
                ingredientName={ ingredient.strIngredient || ingredient.strIngredient1 }
                key={ index }
                index={ index }
                typeRecipe={ typeRecipe }
              />
            )))
        }
      </main>
      <Footer />
    </>
  );
}

const mapStateToProps = ({
  ingredientsReducer: { ingredients, loading, error },
}) => ({
  ingredients,
  loading,
  error,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchIngredients: (type) => dispatch(fetchIngredients(type)),
});

ExploreIngredients.propTypes = {
  dispatchFetchIngredients: PropTypes.func,
  ingredients: PropTypes.objectOf,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExploreIngredients);
