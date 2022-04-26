import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

const initialRecipesQuantity = 12;

describe('Main Recipes Page', () => {
  describe('Requirement 25', () => {
    it('should have 12 recipe cards on route "/comidas"', () => {
      render(
        <MemoryRouter initialEntries={ ['/comidas'] }>
          <App />
        </MemoryRouter>,
      );

      for (let index = 0; index < initialRecipesQuantity; index += 1) {
        expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
        expect(screen.getByTestId(`${index}-card-img`)).toBeInTheDocument();
        expect(screen.getByTestId(`${index}-card-name`)).toBeInTheDocument();
      }

      expect(screen.queryByTestId('12-recipe-card')).not.toBeInTheDocument();
      expect(screen.queryByTestId('12-card-img')).not.toBeInTheDocument();
      expect(screen.queryByTestId('12-card-name')).not.toBeInTheDocument();
    });

    it('should have 12 recipe cards on route "/bebidas"', () => {
      render(
        <MemoryRouter initialEntries={ ['/bebidas'] }>
          <App />
        </MemoryRouter>,
      );

      for (let index = 0; index < initialRecipesQuantity; index += 1) {
        expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
        expect(screen.getByTestId(`${index}-card-img`)).toBeInTheDocument();
        expect(screen.getByTestId(`${index}-card-name`)).toBeInTheDocument();
      }

      expect(screen.queryByTestId('12-recipe-card')).not.toBeInTheDocument();
      expect(screen.queryByTestId('12-card-img')).not.toBeInTheDocument();
      expect(screen.queryByTestId('12-card-name')).not.toBeInTheDocument();
    });
  });
});
