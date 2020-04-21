import React from 'react';
import { Provider } from 'react-redux';
import render from 'react-test-renderer';
import configureStore from 'redux-mock-store';

const mockStore = configureStore({});
import Groups from '.';

describe('Groups component', () => {
  let store = {};

  beforeEach(() => {
    store = mockStore({
      roles: [{orgId: 100, role: 'facilitator'}],
    });
  });

  it('renders without crashing', () => {
    render.create((
      <Provider store={store}>
        <Groups />
      </Provider>
    ));
  });
});
