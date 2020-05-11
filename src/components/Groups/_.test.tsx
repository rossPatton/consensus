import React from 'react';
import { Provider } from 'react-redux';
import render from 'react-test-renderer';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();
import Groups from '.';

describe('Groups component', () => {
  it('renders without crashing', () => {
    const store = mockStore({
      roles: [{groupId: 100, role: 'facilitator'}],
    });

    render.create((
      <Provider store={store}>
        <Groups groups={[]} />
      </Provider>
    ));
  });
});
