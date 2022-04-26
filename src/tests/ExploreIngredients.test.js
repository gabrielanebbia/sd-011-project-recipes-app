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
  history.push('/explorar/comidas/ingredientes');
  expect(screen.getByText(/Conteúdo da tela de Explorar Ingredientes de COMIDAS/i))
    .toBeInTheDocument();
  history.push('/explorar/bebidas/ingredientes');
  expect(screen.getByText(/Conteúdo da tela de Explorar Ingredientes de BEBIDAS/i))
    .toBeInTheDocument();
});
