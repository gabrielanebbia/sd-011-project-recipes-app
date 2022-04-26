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
  history.push('/comidas/178319/in-progress');
  expect(screen.getByText(/Conteúdo da tela de Receita de COMIDAS em Processo/i))
    .toBeInTheDocument();
  history.push('/bebidas/178319/in-progress');
  expect(screen.getByText(/Conteúdo da tela de Receita de BEBIDAS em Processo/i))
    .toBeInTheDocument();
});
