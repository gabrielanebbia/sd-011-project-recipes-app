import React from 'react';
import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';

export default function Profile() {
  const pageTitle = {
    pageName: 'Perfil',
    setIcon: false,
  };
  return (
    <div>
      <Header value={ pageTitle } />
      FOODS
      <FooterMenu />
    </div>
  );
}
