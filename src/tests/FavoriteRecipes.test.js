import React from 'react';
import { render, screen } from '@testing-library/react';
import FavoriteRecipes from '../pages/FavoriteRecipes';

it('basic test', () => {
  render(<FavoriteRecipes />);

  expect(screen.getByText(/Tela de Receitas Favoritas/i)).toBeInTheDocument();
});
