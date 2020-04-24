import React from 'react';
import { Provider } from 'react-redux';
import render from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureStore([thunk]);
import Users from '.';

describe('Users component', () => {
  it('renders without crashing', () => {
    const store = mockStore({
      isLoading: false,
      usersByGroupId: {data: [{id: 100}]},
    });

    const group = {id: 1} as tGroup;

    render.create((
      <Provider store={store}>
        <Users group={group} />
      </Provider>
    ));
  });
});
