import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function ExplorarComidas() {
  return (
    <div>
      <h1>Explorar Comidas</h1>
      <Link
        to="/explorar/comidas/ingredientes"
        data-testid="explore-by-ingredient"
      >
        Por Ingredientes
      </Link>
      <Link
        to="/explorar/comidas/area"
        data-testid="explore-by-area"
      >
        Por Local de Origem
      </Link>
      {/* <Link to="/explorar/comidas"
      data-testid="explore-surprise">Me Surpreenda</Link> */}
      <Footer />
    </div>
  );
}

export default ExplorarComidas;