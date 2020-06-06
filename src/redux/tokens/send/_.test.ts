import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {SEND_FAILURE, SEND_INIT, SEND_SUCCESS} from './_types';
import {failure, init, success} from './actions';

const mockStore = configureStore([thunk]);

describe('redux/tokens/send', () => {
  it('creates correct SEND_INIT action', () => {
    const expectedActionPayload = [{
      type: SEND_INIT,
    }];

    const store = mockStore({});

    // @ts-ignore @TODO mock common data types for jest
    store.dispatch(init());
    expect(store.getActions()).toStrictEqual(expectedActionPayload);
  });

  it('creates correct SEND_SUCCESS action', () => {
    const expectedActionPayload = [{
      type: SEND_SUCCESS,
      payload: [{
        countryId: 1,
        country: 'United States',
        regionId: 1,
        region: 'New York',
        id: 1,
        name: 'New York',
        groups: [{}] as ts.group[],
        postcodes: [10002],
      }],
    }];

    const store = mockStore({});

    store.dispatch(success([{
      countryId: 1,
      country: 'United States',
      regionId: 1,
      region: 'New York',
      id: 1,
      name: 'New York',
      groups: [{}] as ts.group[],
      postcodes: [10002],
    }]));
    expect(store.getActions()).toStrictEqual(expectedActionPayload);
  });

  it('creates correct SEND_FAILURE action', () => {
    const expectedActionPayload = [{
      payload: {
        message: 'Oh no! An Error occurred',
        status: 500,
      },
      type: SEND_FAILURE,
    }];

    const store = mockStore({});

    // @ts-ignore @TODO mock common data types for jest
    store.dispatch(failure({
      message: 'Oh no! An Error occurred',
      status: 500,
    }));
    expect(store.getActions()).toStrictEqual(expectedActionPayload);
  });
});

