import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateFavoriteRecipes } from '../actions/favoriteRecipes';
import { getFromStorage } from '../helpers/utils';
import Header from '../components/Header';
import RecipeFilters from '../components/RecipeFilters';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';

function FavoriteRecipes({ favoriteRecipes, dispatchUpdateFavorites }) {
  const [localFavoriteRecipes, setLocalFavoriteRecipes] = React.useState([]);
  const [filter, setFilter] = React.useState('all');

  React.useEffect(() => {
    const storageFavoriteRecipes = getFromStorage('favoriteRecipes') || [];

    dispatchUpdateFavorites(storageFavoriteRecipes);
  }, [dispatchUpdateFavorites]);

  React.useEffect(() => {
    setLocalFavoriteRecipes(favoriteRecipes);
  }, [favoriteRecipes]);

  const filterRecipes = (recipes) => recipes.filter(({ type }) => {
    if (filter === 'all') return true;

    return type === filter;
  });

  return (
    <>
      <Header withSearch={ false } pageTitle="Receitas Favoritas" />
      <main>
        <RecipeFilters setFilter={ setFilter } />
        <p>{ `Filtro selecionado: ${filter}` }</p>
        <section>
          {
            localFavoriteRecipes && filterRecipes(localFavoriteRecipes).map(
              (recipe, index) => (
                <FavoriteRecipeCard key={ index } recipe={ recipe } count={ index } />
              ),
            )
          }
        </section>
      </main>
    </>
  );
}

const mapStateToProps = ({ favoriteRecipesReducer: { favoriteRecipes } }) => ({
  favoriteRecipes,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchUpdateFavorites:
    (favoriteRecipes) => dispatch(updateFavoriteRecipes(favoriteRecipes)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteRecipes);

FavoriteRecipes.propTypes = {
  favoriteRecipes: PropTypes.arrayOf(PropTypes.object),
  dispatchUpdateFavorites: PropTypes.func,
}.isRequired;
