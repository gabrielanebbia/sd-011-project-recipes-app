import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Recipes from '../pages/Recipes';
import RecipeDetail from '../pages/RecipeDetail';
import RecipeInProgress from '../pages/RecipeInProgress';
import Explore from '../pages/Explore';
import ExploreFoodOrDrink from '../pages/ExploreFoodOrDrink';
import ExploreIngredients from '../pages/ExploreIngredients';
import ExploreLocation from '../pages/ExploreLocation';
import Profile from '../pages/Profile';
import RecipesDone from '../pages/RecipesDone';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import NotFound from '../pages/NotFound';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Recipes } />
        <Route exact path="/bebidas" component={ Recipes } />
        <Route exact path="/comidas/:id" component={ RecipeDetail } />
        <Route exact path="/bebidas/:id" component={ RecipeDetail } />
        <Route exact path="/comidas/:id/in-progress" component={ RecipeInProgress } />
        <Route exact path="/bebidas/:id/in-progress" component={ RecipeInProgress } />
        <Route exact path="/explorar" component={ Explore } />
        <Route exact path="/explorar/comidas" component={ ExploreFoodOrDrink } />
        <Route exact path="/explorar/bebidas" component={ ExploreFoodOrDrink } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ExploreIngredients }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ ExploreIngredients }
        />
        <Route exact path="/explorar/comidas/area" component={ ExploreLocation } />
        <Route exact path="/explorar/Bebidas/area" component={ NotFound } />
        <Route exact path="/perfil" component={ Profile } />
        <Route exact path="/receitas-feitas" component={ RecipesDone } />
        <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
      </Switch>
    );
  }
}

export default Routes;
