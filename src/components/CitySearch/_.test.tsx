import React from 'react';
import { Provider } from 'react-redux';
import render from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {testGeo, testGroup1, testNYC, testUserSession} from '~app/constants/jest';

import CitySearch from '.';
import {CitySearchComponent} from './Component';

const mockStore = configureStore([thunk]);
const defaultStore = {
  cities: {
    error: null as Error | null,
    isLoading: false,
    data: [testNYC],
  },
  geo: {
    error: null as Error | null,
    isLoading: false,
    data: testGeo,
  },
  session: testUserSession,
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
          // getCitiesDispatch={jest.fn()}
          region="New York"
          regionId={37}
          updateState={jest.fn()}
        />
      </Provider>
    ));
    expect(component).toMatchSnapshot();
  });

  it('renders component without crashing', () => {
    const component = render.create((
      <CitySearchComponent
        city="New York"
        cityId={16625}
        cities={[{
          country: 'United States',
          countryId: 1,
          groups: [testGroup1],
          name: 'New York',
          id: 16625,
          postcodes: [10002],
          region: 'New York',
          regionId: 37,
        }]}
        geo={testGeo}
        region="New York"
        regionId={37}
        // @ts-ignore
        session={defaultStore.session}
        showRemoveButton
        updateState={jest.fn()}
      />
    ));
    expect(component).toMatchSnapshot();
  });

  it('renders component with blank city and region', () => {
    const component = render.create((
      <CitySearchComponent
        city=""
        cityId={0}
        cities={[{
          country: 'United States',
          countryId: 1,
          groups: [testGroup1],
          name: 'New York',
          id: 16625,
          postcodes: [10002],
          region: 'New York',
          regionId: 37,
        }]}
        geo={testGeo}
        region=""
        regionId={0}
        // @ts-ignore
        session={defaultStore.session}
        updateState={jest.fn()}
      />
    ));
    expect(component).toMatchSnapshot();
  });

  it('renders with custom label', () => {
    const component = render.create((
      <Provider store={store}>
        <CitySearch
          city="New York"
          cityId={16625}
          label="Testing custom label"
          region="New York"
          regionId={37}
          updateState={jest.fn()}
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
          region="New York"
          regionId={37}
          showRemoveButton
          updateState={jest.fn()}
        />
      </Provider>
    ));
    expect(component).toMatchSnapshot();
  });

  it('renders with blank session region', () => {
    const customStore = {
      ...store,
      session: {
        error: null as Error | null,
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
      <Provider store={customStore}>
        <CitySearch
          city="New York"
          cityId={16625}
          region="New York"
          regionId={37}
          showRemoveButton
          updateState={jest.fn()}
        />
      </Provider>
    ));
    expect(component).toMatchSnapshot();
  });

  it('renders with null session region', () => {
    const customStore = {
      ...store,
      session: {
        error: null as Error | null,
        isLoading: false,
        data: {
          isAuthenticated: false,
          profile: {
            region: null as string | null,
          },
        },
      },
    };
    const component = render.create((
      <Provider store={customStore}>
        <CitySearch
          city="New York"
          cityId={16625}
          region="New York"
          regionId={37}
          showRemoveButton
          updateState={jest.fn()}
        />
      </Provider>
    ));
    expect(component).toMatchSnapshot();
  });
});
