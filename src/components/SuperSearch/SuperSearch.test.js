import React from 'react';
import render from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';

import SuperSearch from '.';

const mockStore = configureStore({});

describe('SuperSearch component', () => {
  let store = {};

  beforeEach(() => {
    store = mockStore({});
  });

  it('renders mobile without crashing', () => {
    render.create((
      <Router>
        <Provider store={store}>
          <SuperSearch />
        </Provider>
      </Router>
    ));
  });
});
