import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Explore from '../pages/Explore';

const exploreFood = 'explore-food';
const exploreDrinks = 'explore-drinks';

describe('Requirement - 67', () => {
  it('Should have elements in the explore page with specific data-testid', () => {
    render(<Explore />);

    expect(screen.getByTestId(exploreFood)).toBeInTheDocument();
    expect(screen.getByTestId(exploreDrinks)).toBeInTheDocument();
  });
});

describe('Requirement - 68', () => {
  it('Should have 2 buttons with names "Explorar Comidas" and "Explorar Bebidas"', () => {
    render(<Explore />);
    expect(screen.getByTestId(exploreFood)).contains('Explorar Comidas');
    expect(screen.getByTestId(exploreDrinks)).contains('Explorar Bebidas');
  });
});

describe('Requirement - 69', () => {
  it('Should redirect to "/explorar/comidas" on click', () => {
    render(
      <MemoryRouter>
        <Explore />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByTestId(exploreFood));
    expect(screen.getByText('Explorar Comidas')).toBeInTheDocument();
  });

  it('Should redirect to "explorar/bebidas" on click', () => {
    render(
      <MemoryRouter>
        <Explore />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByTestId(exploreDrinks));
    expect(screen.getByText('Explorar Bebidas')).toBeInTheDocument();
  });
});
