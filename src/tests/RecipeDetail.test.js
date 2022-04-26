import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

it('basic test', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  history.push('/comidas/52771');
  expect(screen.getByText(/Conteúdo da tela de DETALHES de COMIDAS/i))
    .toBeInTheDocument();
  history.push('/bebidas/178319');
  expect(screen.getByText(/Conteúdo da tela de DETALHES de BEBIDAS/i))
    .toBeInTheDocument();
});
