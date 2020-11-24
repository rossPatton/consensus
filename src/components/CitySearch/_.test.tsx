import { shallow } from 'enzyme';
import React from 'react';
import { create } from 'react-test-renderer';
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

  it('default snapshot', () => {
    const component = create((
      <CitySearch
        city="New York"
        cityId={16625}
        region="New York"
        regionId={37}
        // @ts-ignore
        store={store}
        updateState={jest.fn()}
      />
    ));
    expect(component.root).toMatchSnapshot();
  });

  it('snapshot (different props)', () => {
    const component = create((
      <CitySearch
        city="New York"
        cityId={16625}
        region="New York"
        regionId={37}
        // @ts-ignore
        store={store}
        updateState={jest.fn()}
      />
    ));
    expect(component.root).toMatchSnapshot();
  });

  it('renders with custom label', () => {
    const component = create((
      <CitySearch
        city="New York"
        cityId={16625}
        label="Testing custom label"
        region="New York"
        regionId={37}
        // @ts-ignore
        store={store}
        updateState={jest.fn()}
      />
    ));
    expect(component).toMatchSnapshot();
  });

  it('renders with empty session region (fall back to geo region)', () => {
    const customStore = {
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
    const component = create((
      <CitySearch
        city=""
        region=""
        showResetButton
        // @ts-ignore
        store={mockStore(customStore)}
        updateState={jest.fn()}
      />
    ));
    expect(component).toMatchSnapshot();
  });

  it('renders with null session and geo region', () => {
    const customStore = {
      cities: {
        error: null as Error | null,
        isLoading: false,
        data: [testNYC],
      },
      geo: {
        error: null as Error | null,
        isLoading: false,
        data: {},
      },
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
    const component = create((
      <CitySearch
        city="New York"
        cityId={16625}
        region="New York"
        regionId={37}
        showResetButton
        // @ts-ignore
        store={mockStore(customStore)}
        updateState={jest.fn()}
      />
    ));
    expect(component).toMatchSnapshot();
  });

  it('renders component directly without crashing', () => {
    const component = shallow(
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
        showResetButton
        updateState={jest.fn()}
      />
    )
    const state = component.find('#stateSelect');
    expect(state.prop('value')).toBe('New York');

    const resetButton = component.find('#testResetButton');
    expect(resetButton.prop('children')).toBe('Reset City Search');
  });

  it('renders component with blank city and region', () => {
    const component = shallow((
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
    const city = component.find('#citySelect');
    expect(city.prop('value')).toBe('');
  });

  it('renders component with custom label', () => {
    const component = shallow((
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
        label="Testing custom label"
        region=""
        regionId={0}
        // @ts-ignore
        session={defaultStore.session}
        updateState={jest.fn()}
      />
    ));
    const label = component.find('p');
    expect(label.prop('children')).toBe('Testing custom label');
  });

  it('test onCityChange interaction', () => {
    const updateState = jest.fn();

    const component = shallow((
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
        label="Testing custom label"
        region=""
        regionId={0}
        // @ts-ignore
        session={defaultStore.session}
        showResetButton
        updateState={updateState}
      />
    ));

    const CitySelect = component.find('#citySelect');
    CitySelect.simulate('change', {
      currentTarget: { value: "New York"}
    });

    expect(updateState).toBeCalledTimes(1);
    expect(updateState).toBeCalledWith({
      "city": "New York",
      "cityId": 16625,
      "region": "New York",
      "regionId": 37,
    });

    CitySelect.simulate('change', {
      currentTarget: { value: "Nonsense City Name"}
    });

    expect(updateState).toBeCalledTimes(1);

    component.setProps({cityId: 16625});

    // reset city select
    const ResetCityButton = component.find('#testResetCity');
    ResetCityButton.simulate('click');
    expect(updateState).toBeCalledTimes(2);
    expect(updateState).toBeCalledWith({
      city: '',
      cityId: 0,
    })
  });

  it('test onRegionChange interaction', () => {
    const updateState = jest.fn();

    const component = shallow((
      <CitySearchComponent
        city="New York"
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
        label="Testing custom label"
        region="New York"
        regionId={0}
        // @ts-ignore
        session={defaultStore.session}
        showResetButton
        updateState={updateState}
      />
    ));

    const RegionSelect = component.find('#stateSelect');
    RegionSelect.simulate('change', {
      currentTarget: { value: "New Jersey"}
    });

    expect(updateState).toBeCalledTimes(1);
    expect(updateState).toBeCalledWith({
      city: '',
      cityId: 0,
      region: "New Jersey",
      regionId: 0,
    });

    RegionSelect.simulate('change', {
      currentTarget: { value: "New York"}
    });

    expect(updateState).toBeCalledTimes(1);

    // reset just region select
    const ResetRegionButton = component.find('#testRegionButton');
    ResetRegionButton.simulate('click');

    // resets whole city search form
    const ResetCitySearchButton = component.find('#testResetButton');
    ResetCitySearchButton.simulate('click');
    expect(updateState).toBeCalledTimes(2);
    expect(updateState).toBeCalledWith({
      city: '',
      cityId: 0,
      region: '',
      regionId: 0,
    });
  });
});
