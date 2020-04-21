import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'

import {DELETE_INIT, DELETE_FAILURE, DELETE_SUCCESS} from './_types';
import {failure, init, success} from './actions';

const mockStore = configureStore([thunk]);

describe('redux/account/delete', () => {
  it('creates correct DELETE_INIT action', () => {
    const expectedActionPayload = [{
      type: DELETE_INIT,
    }];

    const store = mockStore({});

    // @ts-ignore @TODO mock common data types for jest
    store.dispatch(init());
    expect(store.getActions()).toStrictEqual(expectedActionPayload);
  });

  it('creates correct DELETE_SUCCESS action', () => {
    const expectedActionPayload = [{
      type: DELETE_SUCCESS,
      payload: {isAuthenticated: true}
    }];

    const store = mockStore({});

    // @ts-ignore @TODO mock common data types for jest
    store.dispatch(success({isAuthenticated: true}));
    expect(store.getActions()).toStrictEqual(expectedActionPayload);
  });

  it('creates correct DELETE_FAILURE action', () => {
    const expectedActionPayload = [{
      payload: {
        message: "Oh no! An Error occurred",
        status: 500,
      },
      type: DELETE_FAILURE,
    }];

    const store = mockStore({});

    // @ts-ignore @TODO mock common data types for jest
    store.dispatch(failure({
      message: "Oh no! An Error occurred",
      status: 500,
    }));
    expect(store.getActions()).toStrictEqual(expectedActionPayload);
  });
});
