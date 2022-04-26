import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../components/Footer';
import '@testing-library/jest-dom';
import Recipes from '../pages/Recipes';
import Explore from '../pages/Explore';
import ExploreFoodOrDrink from '../pages/ExploreFoodOrDrink';
import ExploreIngredients from '../pages/ExploreIngredients';
import ExploreLocation from '../pages/ExploreLocation';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import RecipeDetail from '../pages/RecipeDetail';
import RecipeInProgress from '../pages/RecipeInProgress';
import RecipesDone from '../pages/RecipesDone';

const footer = 'footer';
const drinksBottomBtn = 'drinks-bottom-btn';
const exploreBottomBtn = 'explore-bottom-btn';
const foodBottomBtn = 'food-bottom-btn';
const recipesPage = 'recipes-page';

describe('Requirement 19 ', () => {
  it('Should have elements in the footer with specific data-testid', () => {
    render(<Footer />);
    expect(screen.getByTestId(footer)).toBeInTheDocument();
    expect(screen.getByTestId(drinksBottomBtn)).toBeInTheDocument();
    expect(screen.getByTestId(exploreBottomBtn)).toBeInTheDocument();
    expect(screen.getByTestId(foodBottomBtn)).toBeInTheDocument();
  });
});

describe('Requirement 20', () => {
  it('Should have a correct icons', () => {
    render(<Footer />);
    expect(screen.getByTestId(drinksBottomBtn).src).toContain('drinkIcon');
    expect(screen.getByTestId(exploreBottomBtn).src).toContain('exploreIcon');
    expect(screen.getByTestId(foodBottomBtn).src).toContain('mealIcon');
  });
});

describe('Requirement 21', () => {
  const hasFooter = () => {
    expect(screen.queryByTestId(footer)).toBeInTheDocument();
    expect(screen.queryByTestId(drinksBottomBtn)).toBeInTheDocument();
    expect(screen.queryByTestId(exploreBottomBtn)).toBeInTheDocument();
    expect(screen.queryByTestId(foodBottomBtn)).toBeInTheDocument();
  };

  const hasNoFooter = () => {
    expect(screen.queryByTestId(footer)).not.toBeInTheDocument();
    expect(screen.queryByTestId(drinksBottomBtn)).not.toBeInTheDocument();
    expect(screen.queryByTestId(exploreBottomBtn)).not.toBeInTheDocument();
    expect(screen.queryByTestId(foodBottomBtn)).not.toBeInTheDocument();
  };

  it('Should have a footer in the main food or drink page', () => {
    render(<Recipes />);
    hasFooter();
  });

  it('Should have a footer in the explore page', () => {
    render(<Explore />);
    hasFooter();
  });

  it('Should have a footer in the explore food or drink page', () => {
    render(<ExploreFoodOrDrink />);
    hasFooter();
  });

  it('Should have a footer in the explore food or drink by ingredients page', () => {
    render(<ExploreIngredients />);
    hasFooter();
  });

  it('Should have a footer in the explore food by location page', () => {
    render(<ExploreLocation />);
    hasFooter();
  });

  it('Should have a footer in the profile page', () => {
    render(<Profile />);
    hasFooter();
  });
  it('Should not have a footer in the login page', () => {
    render(<Login />);
    hasNoFooter();
  });

  it('Should not have a footer in the details page', () => {
    render(<RecipeDetail />);
    hasNoFooter();
  });

  it('Should not have a footer in the recipe in progress page', () => {
    render(<RecipeInProgress />);
    hasNoFooter();
  });

  it('Should not have a footer in the recipe done page', () => {
    render(<RecipesDone />);
    hasNoFooter();
  });
});

describe('Requirement 22', () => {
  it('Should redirect to "/bebidas" on click', () => {
    render(
      <MemoryRouter>
        <Recipes />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByTestId(drinksBottomBtn));
    expect(screen.getByTestId(recipesPage)).toBeInTheDocument();
  });
});

describe('Requirement 23', () => {
  it('Should redirect to "/explorar" on click', () => {
    render(
      <MemoryRouter>
        <Recipes />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByTestId(exploreBottomBtn));
    expect(screen.getByTestId(recipesPage)).toBeInTheDocument();
  });
});

describe('Requirement 24', () => {
  it('Should redirect to "/comidas" on click', () => {
    render(
      <MemoryRouter>
        <Recipes />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByTestId(foodBottomBtn));
    expect(screen.getByTestId(recipesPage)).toBeInTheDocument();
  });
});
