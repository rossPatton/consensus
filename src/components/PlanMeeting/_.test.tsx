import React from 'react';
import { Provider } from 'react-redux';
import render from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import PlanMeeting from '.';

const mockStore = configureStore();
const testGroup = {
  category: 'Political',
  cityId: 1,
  name: 'Test Group',
  type: 'public',
} as ts.group;

describe('components/PlanMeeting', () => {
  it('renders without crashing', () => {
    const store = mockStore({
      meetingsByGroupId: {data: [{}]},
      session: {data: {isAuthenticated: false}},
      uploads: {data: {meetingFeaturedImage: ''}},
    });

    render.create((
      <Provider store={store}>
        <PlanMeeting
          group={testGroup}
          router={{pathname: '', state: {}, hash: '', search: ''}}
        />
      </Provider>
    ));
  });
});
