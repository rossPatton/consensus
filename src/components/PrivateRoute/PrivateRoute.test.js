import React from 'react';
import render from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';

import PrivateRoute from '.';
const mockStore = configureStore({});

describe('PrivateRoute component', () => {
  let store = {};

  beforeEach(() => {
    store = mockStore({
      session: {data: {isAuthenticated: false}},
    });
  });

  it('renders without crashing', () => {
    render.create((
      <Provider store={store}>
        <Router>
          <PrivateRoute />
        </Router>
      </Provider>
    ));
  });
});
