import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import render from 'react-test-renderer';
import configureStore from 'redux-mock-store';

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
