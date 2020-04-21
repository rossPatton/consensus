import React from 'react';
import render from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';

import Search from '.';

const mockStore = configureStore({});

describe('Search component', () => {
  let store = {};

  beforeEach(() => {
    store = mockStore({});
  });

  it('renders mobile without crashing', () => {
    render.create((
      <Router>
        <Provider store={store}>
          <Search />
        </Provider>
      </Router>
    ));
  });
});
