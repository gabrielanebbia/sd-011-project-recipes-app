import React from 'react';
import { render, screen } from '@testing-library/react';
import Profile from '../pages/Profile';

it('basic test', () => {
  render(<Profile />);

  expect(screen.getByText(/Tela de Perfil/i)).toBeInTheDocument();
});
