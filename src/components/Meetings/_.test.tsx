import React from 'react';
import { Provider } from 'react-redux';
import render from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import {testMeeting1, testMeeting2} from '~app/constants/jest';
import MatchMediaProvider from '~app/context/MatchMediaProvider';

import Meetings from '.';
import {MeetingsComponent} from './Component';

const mockStore = configureStore();

describe('components/Meetings', () => {
  it('renders mobile container without crashing', () => {
    const store = mockStore({
      session: {isAuthenticated: false},
    });

    const component = render.create((
      <Provider store={store}>
        <MatchMediaProvider isMobile>
          <Meetings meetings={[testMeeting1, testMeeting2]} />
        </MatchMediaProvider>
      </Provider>
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('desktop container with empty meetings array', () => {
    const store = mockStore({
      session: {isAuthenticated: false},
    });

    const component = render.create((
      <Provider store={store}>
        <MatchMediaProvider isDesktop>
          <Meetings meetings={[]} />
        </MatchMediaProvider>
      </Provider>
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders desktop component without crashing', () => {
    const component = render.create((
      <MeetingsComponent
        isDesktop
        deleteMeeting={jest.fn()}
        isMobile={false}
        meetingsToRender={[testMeeting1]}
        pastMeetings={[]}
        upcomingMeetings={[]}
        togglePast={jest.fn()}
      />
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders mobile component without crashing', () => {
    const component = render.create((
      <MeetingsComponent
        isMobile
        deleteMeeting={jest.fn()}
        isDesktop={false}
        meetingsToRender={[]}
        pastMeetings={[]}
        upcomingMeetings={[]}
        togglePast={jest.fn()}
      />
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
