import React from 'react';
import Header from '../components/Header';
import RecipeDoneCard from '../components/RecipeDoneCard';
import RecipeFilters from '../components/RecipeFilters';
import { getFromStorage } from '../helpers/utils';

function RecipesDone() {
  const [filter, setFilter] = React.useState('all');

  const recipesDone = getFromStorage('doneRecipes');

  const filterRecipes = (recipes) => recipes.filter(({ type }) => {
    if (filter === 'all') return true;

    return type === filter;
  });

  return (
    <>
      <Header withSearch={ false } pageTitle="Receitas Feitas" />
      <main>
        <RecipeFilters setFilter={ setFilter } />
        <section>
          {
            recipesDone && filterRecipes(recipesDone).map((recipe, index) => (
              <RecipeDoneCard key={ index } recipe={ recipe } count={ index } />
            ))
          }
        </section>
      </main>
    </>
  );
}

export default RecipesDone;
