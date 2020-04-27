import * as types from './_types';
import {accountReducer as reducer, initialState} from './reducer';

describe('redux/account/reducer', () => {
  it('should return initial state, even with a bunk action', () => {
    expect(reducer(undefined, {} as types.tActions))
      .toStrictEqual(initialState);
  });

  it('should handle DELETE_FAILURE', () => {
    expect(reducer(undefined, {
      type: '@@account/DELETE_FAILURE',
      payload: {
        message: 'Error!',
        status: 500,
      },
    })).toStrictEqual({
      error: {
        message: 'Error!',
        status: 500,
      },
      isLoading: false,
      data: {},
    });
  });

  it('should handle DELETE_SUCCESS', () => {
    expect(reducer(undefined, {
      type: '@@account/DELETE_SUCCESS',
      payload: {} as ts.session,
    })).toStrictEqual({
      error: null,
      isLoading: false,
      data: {},
    });
  });

  it('should handle PATCH_FAILURE', () => {
    expect(reducer(undefined, {
      type: '@@account/PATCH_FAILURE',
      payload: {
        message: 'Error!',
        status: 500,
      },
    })).toStrictEqual({
      error: {
        message: 'Error!',
        status: 500,
      },
      isLoading: false,
      data: {},
    });
  });

  it('should handle PATCH_SUCCESS', () => {
    expect(reducer(undefined, {
      type: '@@account/PATCH_SUCCESS',
      payload: {isVerified: true} as ts.session,
    })).toStrictEqual({
      error: null,
      isLoading: false,
      data: {isVerified: true},
    });
  });
});
