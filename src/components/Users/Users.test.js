import React from 'react';
import { Provider } from 'react-redux';
import render from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureStore([thunk]);
import Users from '.';

describe('Users component', () => {
  let store = {};

  beforeEach(() => {
    store = mockStore({
      isLoading: false,
      usersByOrgId: {data: [{id: 100}]},
    });
  });

  it('renders without crashing', () => {
    render.create((
      <Provider store={store}>
        <Users group={{id: 1}} />
      </Provider>
    ));
  });
});
