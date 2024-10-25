import React from 'react';
import { Provider } from 'react-redux';
import render from 'react-test-renderer';
import configureStore from 'redux-mock-store';

// import { mount, shallow } from 'enzyme';
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
          ...meetingThunk,
          isLoading: true,
        }}
        onSubmit={jest.fn()}
        saveAsDraft={jest.fn()}
        updateState={jest.fn()}
      />
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders component with custom heading and disabled submit', () => {
    const component = render.create((
      <PlanMeetingComponent
        date="test date"
        endTime="9:00"
        error="error"
        group={testGroup}
        heading="Test Form Heading"
        id={1}
        img=""
        isCopy
        isDraft
        isOnline
        title="Test Meeting Title"
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

  // it('test update type interaction', () => {
  //   const updateState = jest.fn();
  //   const component = mount(
  //     <PlanMeetingComponent
  //       date="Test Date Interaction"
  //       endTime="9:00"
  //       error="error"
  //       group={testGroup}
  //       heading="Test Form Heading"
  //       id={1}
  //       img=""
  //       isCopy
  //       isDraft
  //       isOnline
  //       time="7:00"
  //       title="Test Meeting Title Interaction"
  //       meetingThunk={{
  //         ...meetingThunk,
  //       }}
  //       onSubmit={jest.fn()}
  //       saveAsDraft={jest.fn()}
  //       updateState={updateState}
  //     />
  //   );

  //   const Form = component.find('Form');
  //   const UpdateTypeBtn = Form.find('#typeSelect');
  //   UpdateTypeBtn.simulate('change', {
  //     currentTarget: {value: 'Meeting'}
  //   });
  //   expect(updateState).toBeCalledTimes(1);
  // });
});
