import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import render from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import SuperSearch from '.';

const mockStore = configureStore();

describe('SuperSearch component', () => {
  it('renders mobile without crashing', () => {
    const store = mockStore({});

    render.create((
      <Router>
        <Provider store={store}>
          <SuperSearch />
        </Provider>
      </Router>
    ));
  });
});
