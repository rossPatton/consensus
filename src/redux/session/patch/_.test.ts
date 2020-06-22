import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  PATCH_FAILURE,
  PATCH_SUCCESS,
  tFailureAction,
  tSuccessAction,
} from './_types';
import {failure, success} from './actions';

const mockStore = configureStore([thunk]);

describe('redux/session/patch', () => {
  // it('creates correct PATCH_INIT action', () => {
  //   const expectedActionPayload: tInitAction[] = [{
  //     type: PATCH_INIT,
  //   }];

  //   const store = mockStore({});
  //   store.dispatch(init());
  //   expect(store.getActions()).toStrictEqual(expectedActionPayload);
  // });

  it('creates correct PATCH_SUCCESS action', () => {
    const testSession = {
      isAuthenticated: true,
      profile: {} as ts.user,
      type: 'user',
    } as ts.session;

    const expectedActionPayload: tSuccessAction[] = [{
      type: PATCH_SUCCESS,
      payload: testSession,
    }];

    const store = mockStore({});
    store.dispatch(success(testSession));
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

