import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile({ history: { push } }) {
  function getUserEmail() {
    const user = JSON.parse(localStorage.getItem('user')) || {};
    return user.email;
  }

  function toFavoriteRecipes() {
    push('/receitas-favoritas');
  }

  function toRecipesDone() {
    push('/receitas-feitas');
  }

  function handleLogout() {
    localStorage.clear();
    push('/');
  }

  return (
    <>
      <Header withSearch={ false } pageTitle="Perfil" />
      <main>
        <br />
        <span>E-mail:</span>
        &nbsp;
        &nbsp;
        <span data-testid="profile-email">
          { getUserEmail() }
        </span>
        <br />
        <br />
        <br />
        <button
          data-testid="profile-done-btn"
          aria-label="Botão de Receitas feitas"
          type="button"
          onClick={ toRecipesDone }
        >
          Receitas Feitas
        </button>
        <br />
        <button
          data-testid="profile-favorite-btn"
          aria-label="Botão de Receitas favoritas"
          type="button"
          onClick={ toFavoriteRecipes }
        >
          Receitas Favoritas
        </button>
        <br />
        <button
          data-testid="profile-logout-btn"
          aria-label="Botão de sair"
          type="button"
          onClick={ handleLogout }
        >
          Sair
        </button>
        <br />
      </main>
      <Footer />
    </>
  );
}

export default Profile;

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequisred;
