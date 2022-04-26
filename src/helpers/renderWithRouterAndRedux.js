import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { render } from '@testing-library/react';
import rootReducer from '../reducers';

const createMockStore = (initialState) => (
  createStore(rootReducer, initialState, applyMiddleware(thunk))
);

const renderWithRouterAndRedux = (
  component, { initialState, store = createMockStore(initialState) } = {},
) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <Provider store={ store }>
        <Router history={ history }>
          {component}
        </Router>
      </Provider>,
    ),
    history,
    store,
  });
};

export default renderWithRouterAndRedux;
