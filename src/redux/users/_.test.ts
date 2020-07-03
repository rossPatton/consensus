import {testUser1} from '~app/constants/jest';

import * as types from './_types';
import {initialState, usersReducer as reducer} from './reducer';

describe('redux/users/reducer', () => {
  it('should return initial state, even with a bunk action', () => {
    expect(reducer(undefined, {} as types.tActions))
      .toStrictEqual(initialState);
  });

  it('should handle GET_INIT', () => {
    expect(reducer(undefined, {
      type: '@@users/GET_INIT',
    })).toStrictEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle GET_FAILURE', () => {
    expect(reducer(undefined, {
      type: '@@users/GET_FAILURE',
      payload: {
        message: 'Error!',
        status: 500,
      },
    })).toStrictEqual({
      ...initialState,
      error: {
        message: 'Error!',
        status: 500,
      },
    });
  });

  it('should handle GET_SUCCESS', () => {
    expect(reducer(undefined, {
      type: '@@users/GET_SUCCESS',
      payload: [testUser1, testUser1, testUser1],
    })).toStrictEqual({
      ...initialState,
      fetched: true,
      data: [testUser1, testUser1, testUser1],
    });
  });
});
