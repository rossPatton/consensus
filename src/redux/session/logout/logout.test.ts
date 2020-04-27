import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  LOGOUT_FAILURE,
  LOGOUT_INIT,
  LOGOUT_SUCCESS,
  tFailureAction,
  tInitAction,
  tSuccessAction,
} from './_types';
import {failure, init, success} from './actions';

const mockStore = configureStore([thunk]);

describe('redux/session/login', () => {
  it('creates correct LOGOUT_INIT action', () => {
    const expectedActionPayload: tInitAction[] = [{
      type: LOGOUT_INIT,
    }];

    const store = mockStore({});
    store.dispatch(init());
    expect(store.getActions()).toStrictEqual(expectedActionPayload);
  });

  it('creates correct LOGOUT_SUCCESS action', () => {
    const testSession = {
      isAuthenticated: true,
      isVerified: true,
      profile: {} as tUser,
      type: 'user',
    } as ts.session;

    const expectedActionPayload: tSuccessAction[] = [{
      type: LOGOUT_SUCCESS,
      payload: testSession,
    }];

    const store = mockStore({});
    store.dispatch(success(testSession));
    expect(store.getActions()).toStrictEqual(expectedActionPayload);
  });

  it('creates correct LOGOUT_FAILURE action', () => {
    const expectedActionPayload: tFailureAction[] = [{
      payload: {
        message: 'Oh no! An Error occurred',
        status: 500,
      },
      type: LOGOUT_FAILURE,
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

