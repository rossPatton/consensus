import React from 'react';
import { Provider } from 'react-redux';
import render from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { testMeeting1 } from '~app/constants/jest';

import PlanMeeting from '.';
import {PlanMeetingComponent} from './Component';

const mockStore = configureStore();
const testGroup = {
  category: 'Political',
  cityId: 1,
  name: 'Test Group',
  type: 'public',
} as ts.group;

const meetingThunk = {
  error: {message: 'test', status: 200 as ts.statusUnion},
  isLoading: false,
  data: testMeeting1,
};

describe('components/PlanMeeting', () => {
  it('container renders', () => {
    const store = mockStore({
      meetingsByGroupId: {data: [{}]},
      session: {data: {isAuthenticated: false}},
      uploads: {data: {meetingFeaturedImage: ''}},
    });

    const component = render.create((
      <Provider store={store}>
        <PlanMeeting
          group={testGroup}
          router={{pathname: '', state: {}, hash: '', search: ''}}
        />
      </Provider>
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders component without crashing', () => {
    const component = render.create((
      <PlanMeetingComponent
        group={testGroup}
        img=""
        endTime="9:00"
        error="error"
        isCopy={false}
        isOnline
        time="7:00"
        meetingThunk={meetingThunk}
        onSubmit={jest.fn()}
        saveAsDraft={jest.fn()}
        updateState={jest.fn()}
      />
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders component as draft', () => {
    const component = render.create((
      <PlanMeetingComponent
        group={testGroup}
        img=""
        endTime="9:00"
        error="error"
        isCopy={false}
        isDraft
        isOnline={false}
        time="7:00"
        meetingThunk={meetingThunk}
        onSubmit={jest.fn()}
        saveAsDraft={jest.fn()}
        updateState={jest.fn()}
      />
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders component as draft and copy', () => {
    const component = render.create((
      <PlanMeetingComponent
        group={testGroup}
        img=""
        endTime="9:00"
        error="error"
        isCopy
        isDraft
        isOnline
        time="7:00"
        meetingThunk={meetingThunk}
        onSubmit={jest.fn()}
        saveAsDraft={jest.fn()}
        updateState={jest.fn()}
      />
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders component loading state', () => {
    const component = render.create((
      <PlanMeetingComponent
        group={testGroup}
        img=""
        endTime="9:00"
        error="error"
        isCopy
        isDraft
        isOnline
        time="7:00"
        meetingThunk={{
          isLoading: true,
          ...meetingThunk,
        }}
        onSubmit={jest.fn()}
        saveAsDraft={jest.fn()}
        updateState={jest.fn()}
      />
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
