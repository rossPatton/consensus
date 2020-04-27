import * as types from './_types';
import {cityReducer as reducer, initialState} from './reducer';

describe('redux/city/reducer', () => {
  it('should return initial state, even with a bunk action', () => {
    expect(reducer(undefined, {} as types.tActions))
      .toStrictEqual(initialState);
  });

  it('should handle GET_FAILURE', () => {
    expect(reducer(undefined, {
      type: '@@city/GET_FAILURE',
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

  it('should handle GET_SUCCESS', () => {
    expect(reducer(undefined, {
      type: '@@city/GET_SUCCESS',
      payload: {} as tCity,
    })).toStrictEqual({
      error: null,
      fetched: true,
      isLoading: false,
      data: {},
    });
  });
});
