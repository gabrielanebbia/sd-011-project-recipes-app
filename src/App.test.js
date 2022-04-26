import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

test('Farewell, front-end', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const linkElement = getByText(/Login/i);
  expect(linkElement).toBeInTheDocument();
});
