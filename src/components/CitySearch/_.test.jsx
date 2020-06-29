import React from 'react';
import { Provider } from 'react-redux';
import render from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {testGeo, testNYC} from '~app/constants/jest';

import CitySearch from '.';

const mockStore = configureStore([thunk]);
const defaultStore = {
  cities: {
    error: null,
    isLoading: false,
    data: [testNYC],
  },
  geo: {
    error: null,
    isLoading: false,
    data: testGeo,
  },
  session: {
    error: null,
    isLoading: false,
    data: {
      isAuthenticated: false,
      profile: {
        region: 'New York',
      },
    },
  },
};

describe('components/CitySearch', () => {
  let store = mockStore({});

  beforeEach(() => {
    store = mockStore(defaultStore);
  });

  it('renders without crashing', () => {
    const component = render.create((
      <Provider store={store}>
        <CitySearch
          city="New York"
          cityId={16625}
          getCitiesDispatch={jest.fn()}
          region="New York"
          regionId={37}
        />
      </Provider>
    ));
    expect(component).toMatchSnapshot();
  });

  it('renders with custom label', () => {
    const component = render.create((
      <Provider store={store}>
        <CitySearch
          city="New York"
          cityId={16625}
          getCitiesDispatch={jest.fn()}
          label="Testing custom label"
          region="New York"
          regionId={37}
        />
      </Provider>
    ));
    expect(component).toMatchSnapshot();
  });

  it('renders with remove button', () => {
    const component = render.create((
      <Provider store={store}>
        <CitySearch
          city="New York"
          cityId={16625}
          getCitiesDispatch={jest.fn()}
          region="New York"
          regionId={37}
          showRemoveButton
        />
      </Provider>
    ));
    expect(component).toMatchSnapshot();
  });

  it('renders with blank session region', () => {
    const customStore = {
      ...store,
      session: {
        error: null,
        isLoading: false,
        data: {
          isAuthenticated: false,
          profile: {
            region: '',
          },
        },
      },
    };
    const component = render.create((
      <Provider store={store}>
        <CitySearch
          city="New York"
          cityId={16625}
          getCitiesDispatch={jest.fn()}
          region="New York"
          regionId={37}
          showRemoveButton
        />
      </Provider>
    ));
    expect(component).toMatchSnapshot();
  });

  it('renders with null session region', () => {
    const customStore = {
      ...store,
      session: {
        error: null,
        isLoading: false,
        data: {
          isAuthenticated: false,
          profile: {
            region: null,
          },
        },
      },
    };
    const component = render.create((
      <Provider store={store}>
        <CitySearch
          city="New York"
          cityId={16625}
          getCitiesDispatch={jest.fn()}
          region="New York"
          regionId={37}
          showRemoveButton
        />
      </Provider>
    ));
    expect(component).toMatchSnapshot();
  });
});
