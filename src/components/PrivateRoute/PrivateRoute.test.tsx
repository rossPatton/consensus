import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import render from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import PrivateRoute from '.';
const mockStore = configureStore();

describe('PrivateRoute component', () => {
  it('renders without crashing', () => {
    const store = mockStore({
      session: {data: {isAuthenticated: false}},
    });

    render.create((
      <Provider store={store}>
        <Router>
          <PrivateRoute path="/" component={<></>} />
        </Router>
      </Provider>
    ));
  });
});
