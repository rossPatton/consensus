import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import render from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import MatchMediaProvider from '~app/context/MatchMediaProvider';

import RSVP from '.';

const mockStore = configureStore();

describe('RSVP component', () => {
  let store = mockStore({});

  beforeEach(() => {
    store = mockStore({
      isLoading: false,
      rsvps: {
        data: [{
          meetingId: 1,
          type: 'public',
          userId: 100,
          value: 'yes',
        }],
      },
      session: {
        data: {
          isAuthenticated: false,
          type: 'user',
        },
      },
    });
  });

  it('renders mobile without crashing', () => {
    const meeting = {id: 1} as ts.meeting;

    render.create((
      <Provider store={store}>
        <Router>
          <MatchMediaProvider isMobile>
            <RSVP meeting={meeting} />
          </MatchMediaProvider>
        </Router>
      </Provider>
    ));
  });

  it('renders desktop without crashing', () => {
    const meeting = {id: 1} as ts.meeting;

    render.create((
      <Provider store={store}>
        <Router>
          <MatchMediaProvider isDesktop>
            <RSVP meeting={meeting} />
          </MatchMediaProvider>
        </Router>
      </Provider>
    ));
  });
});
