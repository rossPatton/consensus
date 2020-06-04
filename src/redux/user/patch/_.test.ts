import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  PATCH_FAILURE,
  PATCH_INIT,
  PATCH_SUCCESS,
  tFailureAction,
  tInitAction,
  tSuccessAction,
} from './_types';
import {failure, init, success} from './actions';

const mockStore = configureStore([thunk]);

describe('redux/user/patch', () => {
  it('creates correct PATCH_INIT action', () => {
    const expectedActionPayload: tInitAction[] = [{
      type: PATCH_INIT,
    }];

    const store = mockStore({});
    store.dispatch(init());
    expect(store.getActions()).toStrictEqual(expectedActionPayload);
  });

  it('creates correct PATCH_SUCCESS action', () => {
    const testUser = {
      id: 1,
      bio: '',
      username: 'testUser',
    } as ts.user;

    const expectedActionPayload: tSuccessAction[] = [{
      type: PATCH_SUCCESS,
      payload: testUser,
    }];

    const store = mockStore({});
    store.dispatch(success(testUser));
    expect(store.getActions()).toStrictEqual(expectedActionPayload);
  });

  it('creates correct PATCH_FAILURE action', () => {
    const expectedActionPayload: tFailureAction[] = [{
      payload: {
        message: 'Oh no! An Error occurred',
        status: 500,
      },
      type: PATCH_FAILURE,
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

