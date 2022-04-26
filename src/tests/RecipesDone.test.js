import React from 'react';
import { render, screen } from '@testing-library/react';
import RecipesDone from '../pages/RecipesDone';

it('basic test', () => {
  render(<RecipesDone />);

  expect(screen.getByText(/Tela de Receitas Feitas/i)).toBeInTheDocument();
});
