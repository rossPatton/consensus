import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  LOGIN_FAILURE,
  LOGIN_INIT,
  LOGIN_SUCCESS,
  tFailureAction,
  tInitAction,
  tSuccessAction,
} from './_types';
import {failure, init, success} from './actions';

const mockStore = configureStore([thunk]);

describe('redux/session/login', () => {
  it('creates correct LOGIN_INIT action', () => {
    const expectedActionPayload: tInitAction[] = [{
      type: LOGIN_INIT,
    }];

    const store = mockStore({});
    store.dispatch(init());
    expect(store.getActions()).toStrictEqual(expectedActionPayload);
  });

  it('creates correct LOGIN_SUCCESS action', () => {
    const testSession = {
      isAuthenticated: true,
      profile: {} as ts.user,
      type: 'user',
    } as ts.session;

    const expectedActionPayload: tSuccessAction[] = [{
      type: LOGIN_SUCCESS,
      payload: testSession,
    }];

    const store = mockStore({});
    store.dispatch(success(testSession));
    expect(store.getActions()).toStrictEqual(expectedActionPayload);
  });

  it('creates correct LOGIN_FAILURE action', () => {
    const expectedActionPayload: tFailureAction[] = [{
      payload: {
        message: 'Oh no! An Error occurred',
        status: 500,
      },
      type: LOGIN_FAILURE,
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

