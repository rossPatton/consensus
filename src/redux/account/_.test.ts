import * as types from './_types';
import {accountReducer as reducer, initialState} from './reducer';

describe('redux/account/reducer', () => {
  it('should return initial state, even with a bunk action', () => {
    expect(reducer(undefined, {} as types.tAccountActionUnion))
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
      fetched: false,
      isLoading: false,
      data: {},
    });
  });

  it('should handle DELETE_SUCCESS', () => {
    expect(reducer(undefined, {
      type: '@@account/DELETE_SUCCESS',
      payload: {} as tSession,
    })).toStrictEqual({
      error: null,
      fetched: true,
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
      fetched: false,
      isLoading: false,
      data: {},
    });
  });

  it('should handle PATCH_SUCCESS', () => {
    expect(reducer(undefined, {
      type: '@@account/PATCH_SUCCESS',
      payload: {isVerified: true} as tSession,
    })).toStrictEqual({
      error: null,
      fetched: true,
      isLoading: false,
      data: {isVerified: true},
    });
  });
});
