import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  DELETE_FAILURE,
  DELETE_INIT,
  DELETE_SUCCESS,
  tFailureAction,
  tInitAction,
  tSuccessAction,
} from './_types';
import {failure, init, success} from './actions';

const mockStore = configureStore([thunk]);

describe('redux/usersByGroupId/delete', () => {
  it('creates correct DELETE_INIT action', () => {
    const expectedActionPayload: tInitAction[] = [{
      type: DELETE_INIT,
    }];

    const store = mockStore({});
    store.dispatch(init());
    expect(store.getActions()).toStrictEqual(expectedActionPayload);
  });

  it('creates correct DELETE_SUCCESS action', () => {
    const expectedActionPayload: tSuccessAction[] = [{
      type: DELETE_SUCCESS,
      payload: {userId: 1},
    }];

    const store = mockStore({});
    store.dispatch(success({userId: 1}));
    expect(store.getActions()).toStrictEqual(expectedActionPayload);
  });

  it('creates correct DELETE_FAILURE action', () => {
    const expectedActionPayload: tFailureAction[] = [{
      payload: {
        message: 'Oh no! An Error occurred',
        status: 500,
      },
      type: DELETE_FAILURE,
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

