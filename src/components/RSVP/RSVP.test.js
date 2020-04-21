import React from 'react';
import render from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';

import MatchMediaProvider from '~app/context/MatchMediaProvider';
import RSVP from '.';

const mockStore = configureStore({});

describe('RSVP component', () => {
  let store = {};

  beforeEach(() => {
    store = mockStore({
      isLoading: false,
      rsvps: {
        data: [{
          eventId: 1,
          type: "public",
          userId: 100,
          value: 'yes',
        }]
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
    render.create((
      <Provider store={store}>
        <Router>
          <MatchMediaProvider value={{isMobile: true}}>
            <RSVP event={{id: 1}} />
          </MatchMediaProvider>
        </Router>
      </Provider>
    ));
  });
});
