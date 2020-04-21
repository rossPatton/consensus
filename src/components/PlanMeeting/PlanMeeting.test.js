import React from 'react';
import { Provider } from 'react-redux';
import render from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import PlanMeeting from '.';

const mockStore = configureStore({});
const testGroup = {
  category: 'Political',
  cityId: 1,
  orgName: 'Test Group',
  type: 'public',
};

describe('PlanMeeting component', () => {
  let store = {};

  beforeEach(() => {
    store = mockStore({
      eventsByOrgId: {
        data: [{}],
      },
      session: {data: {isAuthenticated: false}},
    });
  });

  it('renders without crashing', () => {
    render.create((
      <Provider store={store}>
        <PlanMeeting
          org={testGroup}
          router={{search: ''}}
        />
      </Provider>
    ));
  });
});
