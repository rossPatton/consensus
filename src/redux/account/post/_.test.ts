import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as types from './_types';
import * as actions from './actions';

const mockStore = configureStore([thunk]);

describe('redux/account/patch', () => {
  it('creates correct POST_INIT action', () => {
    const expectedActionPayload: types.tInitAction[] = [{
      type: types.POST_INIT,
    }];

    const store = mockStore({});
    store.dispatch(actions.init());
    expect(store.getActions()).toStrictEqual(expectedActionPayload);
  });

  it('creates correct POST_SUCCESS action', () => {
    const expectedActionPayload: types.tSuccessAction[] = [{
      type: types.POST_SUCCESS,
      payload: {isAuthenticated: true} as ts.session,
    }];

    const store = mockStore({});
    store.dispatch(actions.success({isAuthenticated: true} as ts.session));
    expect(store.getActions()).toStrictEqual(expectedActionPayload);
  });

  it('creates correct POST_FAILURE action', () => {
    const expectedActionPayload: types.tFailureAction[] = [{
      payload: {
        message: 'Oh no! An Error occurred',
        status: 500,
      },
      type: types.POST_FAILURE,
    }];

    const store = mockStore({});
    store.dispatch(actions.failure({
      message: 'Oh no! An Error occurred',
      status: 500,
    }));
    expect(store.getActions()).toStrictEqual(expectedActionPayload);
  });
});
