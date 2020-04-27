import * as types from './_types';
import {citiesReducer as reducer, initialState} from './reducer';

describe('redux/cities/reducer', () => {
  it('bunk action returns initial state', () => {
    expect(reducer(undefined, {} as types.tActions))
      .toStrictEqual(initialState);
  });

  it('should handle GET_INIT', () => {
    expect(reducer(undefined, {
      type: '@@cities/GET_INIT',
    })).toStrictEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle GET_FAILURE', () => {
    expect(reducer(undefined, {
      type: '@@cities/GET_FAILURE',
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
      type: '@@cities/GET_SUCCESS',
      payload: [{}] as ts.city[],
    })).toStrictEqual({
      ...initialState,
      fetched: true,
      data: [{}],
    });
  });
});
