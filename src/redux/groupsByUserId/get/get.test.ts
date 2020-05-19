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

const testGroup = {
  allowNonVerified: true,
  avatar: '',
  category: 'Union' as ts.category,
  city: 'New York',
  cityId: 1,
  country: 'United States',
  countryId: 1,
  description: '',
  id: 1,
  memberName: 'member',
  modName: 'facilitator',
  name: 'Tech Workers Coalition Chapter',
  region: 'New York',
  regionId: 1,
  handle: 'tech-workers-coalition-chapter',
  type: 'private' as ts.privacyEnum,
};

describe('redux/groupsByUserId/get', () => {
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
      payload: [testGroup],
    }];

    const store = mockStore({});
    store.dispatch(success([testGroup]));
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

