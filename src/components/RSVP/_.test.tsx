import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import render from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import {testMeeting2, testUserSession, testUserSession2} from '~app/constants/jest';
import MatchMediaProvider from '~app/context/MatchMediaProvider';

import RSVP from '.';
import {RSVPComponent} from './Component';

const mockStore = configureStore();

describe('components/RSVP', () => {
  let store = mockStore({});

  beforeEach(() => {
    store = mockStore({
      rsvps: {
        data: [{
          meetingId: 1,
          type: 'public',
          userId: 100,
          value: 'yes',
        }],
      },
      session: testUserSession,
    });
  });

  it('renders mobile without crashing', () => {
    const meeting = {id: 1} as ts.meeting;

    const component = render.create((
      <Provider store={store}>
        <MemoryRouter>
          <MatchMediaProvider isMobile>
            <RSVP meeting={meeting} />
          </MatchMediaProvider>
        </MemoryRouter>
      </Provider>
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders desktop without crashing', () => {
    const meeting = {id: 1} as ts.meeting;

    const component = render.create((
      <Provider store={store}>
        <MemoryRouter>
          <MatchMediaProvider isDesktop>
            <RSVP meeting={meeting} />
          </MatchMediaProvider>
        </MemoryRouter>
      </Provider>
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders null if group type', () => {
    const meeting = {id: 1} as ts.meeting;
    const customStore = mockStore({
      rsvps: {
        data: [{
          meetingId: 1,
          type: 'public',
          userId: 100,
          value: undefined,
        }],
      },
      session: {
        data: {
          isAuthenticated: false,
          type: 'group',
        },
      },
    });

    const component = render.create((
      <Provider store={customStore}>
        <MemoryRouter>
          <MatchMediaProvider isDesktop>
            <RSVP meeting={meeting} />
          </MatchMediaProvider>
        </MemoryRouter>
      </Provider>
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('component renders', () => {
    const component = render.create((
      <RSVPComponent
        isDesktop
        isMobile={false}
        meeting={testMeeting2}
        // @ts-ignore
        session={testUserSession}
      />
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('component renders with rsvp', () => {
    const component = render.create((
      <RSVPComponent
        isDesktop
        isMobile={false}
        meeting={testMeeting2}
        rsvp={{
          meetingId: 1,
          type: 'public',
          userId: 100,
          value: 'yes',
        }}
        // @ts-ignore
        session={testUserSession}
      />
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('component renders with maybe rsvp', () => {
    const component = render.create((
      <RSVPComponent
        isDesktop
        isMobile={false}
        meeting={testMeeting2}
        rsvp={{
          meetingId: 1,
          type: 'public',
          userId: 100,
          value: 'maybe',
        }}
        // @ts-ignore
        session={testUserSession2}
      />
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('component onSubmit', () => {
    const component = render.create((
      <RSVPComponent
        isDesktop
        isMobile={false}
        hasMounted
        meeting={testMeeting2}
        // @ts-ignore
        session={testUserSession2}
        setRsvp={jest.fn()}
      />
    ));

    component.root.findByType('form').props.onSubmit();
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('component click rsvp buttons', () => {
    const component = render.create((
      <RSVPComponent
        isDesktop
        isMobile={false}
        hasMounted
        meeting={testMeeting2}
        // @ts-ignore
        session={testUserSession}
        setRsvp={jest.fn()}
      />
    ));

    component.root.findByProps({value: 'yes'}).props.onClick();
    component.root.findByProps({value: 'maybe'}).props.onClick();
    component.root.findByProps({value: 'no'}).props.onClick();
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
