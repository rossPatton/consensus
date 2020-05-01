import React from 'react';
import { Provider } from 'react-redux';
import render from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import MatchMediaProvider from '~app/context/MatchMediaProvider';

const mockStore = configureStore();
import Meetings from '.';

describe('Meetings component', () => {
  it('renders mobile without crashing', () => {
    const store = mockStore({
      session: {isAuthenticated: false},
    });

    render.create((
      <Provider store={store}>
        <MatchMediaProvider isMobile>
          <Meetings meetings={[]} />
        </MatchMediaProvider>
      </Provider>
    ));
  });

  it('renders desktop without crashing', () => {
    const store = mockStore({
      session: {isAuthenticated: false},
    });

    render.create((
      <Provider store={store}>
        <MatchMediaProvider isDesktop>
          <Meetings meetings={[]} />
        </MatchMediaProvider>
      </Provider>
    ));
  });
});
