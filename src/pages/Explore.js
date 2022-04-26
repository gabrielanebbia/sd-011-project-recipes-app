import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Explore() {
  const history = useHistory();

  function handleClick(path) {
    history.push(path);
  }

  return (
    <>
      <Header withSearch={ false } pageTitle="Explorar" />
      <br />
      <main>
        <section>
          <button
            type="button"
            onClick={ () => handleClick('/explorar/comidas') }
            data-testid="explore-food"
          >
            Explorar Comidas
          </button>
        </section>
        <section>
          <button
            type="button"
            onClick={ () => handleClick('/explorar/bebidas') }
            data-testid="explore-drinks"
          >
            Explorar Bebidas
          </button>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Explore;
