import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  GET_FAILURE,
  GET_INIT,
  GET_SUCCESS,
  tFailureAction,
  tInitAction,
  tSuccessAction,
} from './_types';
import {failure, init, success} from './actions';

const mockStore = configureStore([thunk]);

const testGeo = {
  city: 'New York',
  countryCode: 'us',
  handle: 'new-york',
  postcode: 10002,
  region: 'New York',
  regionCode: 'ny',
};

describe('redux/geo/get', () => {
  it('creates correct GET_INIT action', () => {
    const expectedActionPayload: tInitAction[] = [{
      type: GET_INIT,
    }];

    const store = mockStore({});
    store.dispatch(init());
    expect(store.getActions()).toStrictEqual(expectedActionPayload);
  });

  it('creates correct GET_SUCCESS action', () => {
    const expectedActionPayload: tSuccessAction[] = [{
      type: GET_SUCCESS,
      payload: testGeo,
    }];

    const store = mockStore({});
    store.dispatch(success(testGeo));
    expect(store.getActions()).toStrictEqual(expectedActionPayload);
  });

  it('creates correct GET_FAILURE action', () => {
    const expectedActionPayload: tFailureAction[] = [{
      payload: {
        message: 'Oh no! An Error occurred',
        status: 500,
      },
      type: GET_FAILURE,
    }];

    const store = mockStore({});
    store.dispatch(failure({
      message: 'Oh no! An Error occurred',
      status: 500,
    }));
    expect(store.getActions()).toStrictEqual(expectedActionPayload);
  });
});

