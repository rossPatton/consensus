import MatchMediaProvider from '@app/context/MatchMediaProvider';
import React from 'react';
import { Provider } from 'react-redux';
import render from 'react-test-renderer';
import configureStore from 'redux-mock-store';

const mockStore = configureStore({});
import Events from '.';

describe('test suite for Events comonent', () => {
  let store = {};

  beforeEach(() => {
    store = mockStore({
      session: {isAuthenticated: false},
    });
  });

  it('renders mobile without crashing', () => {
    render.create((
      <Provider store={store}>
        <MatchMediaProvider value={{isMobile: true}}>
          <Events />
        </MatchMediaProvider>
      </Provider>
    ));
  });

  it('renders desktop without crashing', () => {
    render.create((
      <Provider store={store}>
        <MatchMediaProvider value={{isDesktop: true}}>
          <Events />
        </MatchMediaProvider>
      </Provider>
    ));
  });
});
