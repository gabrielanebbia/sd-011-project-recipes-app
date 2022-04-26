import React from 'react';
import { render, screen } from '@testing-library/react';
import ExploreLocation from '../pages/ExploreLocation';

it('basic test', () => {
  render(<ExploreLocation />);

  expect(screen.getByText(/Tela de Explorar por Local de Origem/i))
    .toBeInTheDocument();
});
