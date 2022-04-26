import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

const PROFILE_TOP_BTN = 'profile-top-btn';
const SEARCH_TOP_BTN = 'search-top-btn';
const PAGE_TITLE = 'page-title';

describe('Requeriment 09', () => {
  const hasNoHeader = () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    history.push('/comidas');
    expect(screen.getByTestId(PROFILE_TOP_BTN)).toBeInTheDocument();
    expect(screen.getByTestId(SEARCH_TOP_BTN)).toBeInTheDocument();
    expect(screen.getByTestId(PAGE_TITLE)).toBeInTheDocument();
  };

  it('Header elements should have proper data-testid', () => {
    hasNoHeader();
  });
});

describe('Requeriment 10', () => {
  const hasNoHeader = () => {
    expect(screen.queryByTestId(PROFILE_TOP_BTN)).not.toBeInTheDocument();
    expect(screen.queryByTestId(PAGE_TITLE)).not.toBeInTheDocument();
    expect(screen.queryByTestId(SEARCH_TOP_BTN)).not.toBeInTheDocument();
  };

  const hasHeader = (title, withSearchButton = true) => {
    expect(screen.queryByTestId(PROFILE_TOP_BTN))
      .toHaveAttribute('src', 'profileIcon.svg');
    expect(screen.queryByTestId(PAGE_TITLE).innerHTML).toEqual(title);

    if (withSearchButton) {
      expect(screen.queryByTestId(SEARCH_TOP_BTN))
        .toHaveAttribute('src', 'searchIcon.svg');
    } else {
      expect(screen.queryByTestId(SEARCH_TOP_BTN)).not.toBeInTheDocument();
    }
  };

  it('There is no header on the Login screen', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    hasNoHeader();
  });

  it('There is correct icon on the Food Recipe main screen', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    history.push('/comidas');
    hasHeader('Comidas');
  });

  it('There is correct icon on the Drink Recipe main screen', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    history.push('/bebidas');
    hasHeader('Bebidas');
  });

  it('There is no Header on the Food Recipes Detail screen', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    history.push('/comidas/52771');
    hasNoHeader();
  });

  it('There is no Header on the Drink Recipes Detail screen', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    history.push('/bebidas/178319');
    hasNoHeader();
  });

  it('There is no Header on the Food Recipes progress screen', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    history.push('/comidas/178319/in-progress');
    hasNoHeader();
  });

  it('There is no Header on the Drink Recipes progress screen', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    history.push('/bebidas/178319/in-progress');
    hasNoHeader();
  });

  it('There is correct icon on the Explore screen', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    history.push('/explorar');
    hasHeader('Explorar', false);
  });

  it('There is correct icon on the Explore Food screen', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    history.push('/explorar/comidas');
    hasHeader('Explorar Comidas', false);
  });

  it('There is correct icon on the Explore Drink screen', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    history.push('/explorar/bebidas');
    hasHeader('Explorar Bebidas', false);
  });

  it('There is correct icon on the Explore Food by ingredients screen', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    history.push('/explorar/comidas/ingredientes');
    hasHeader('Explorar Ingredientes', false);
  });

  it('There is correct icon on the Explore drink by ingredients screen', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    history.push('/explorar/bebidas/ingredientes');
    hasHeader('Explorar Ingredientes', false);
  });

  it('There is correct icon on the "Explore food by location" screen', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    history.push('/explorar/comidas/area');
    hasHeader('Explorar Origem');
  });

  it('There is correct icon on the "profile" header screen', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    history.push('/perfil');
    hasHeader('Perfil', false);
  });

  it('There is correct icon on the "Recipes done" header screen', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    history.push('/receitas-feitas');
    hasHeader('Receitas Feitas', false);
  });

  it('There is correct icon on the "Recipes favorite" header screen', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    history.push('/receitas-favoritas');
    hasHeader('Receitas Favoritas', false);
  });
});
