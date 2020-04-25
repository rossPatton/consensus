import * as types from './_types';
import {geoReducer as reducer, initialState} from './reducer';

describe('redux/geo/reducer', () => {
  it('should return initial state, even with a bunk action', () => {
    expect(reducer(undefined, {} as types.tGeoActionUnion))
      .toStrictEqual(initialState);
  });

  it('should handle GET_INIT', () => {
    expect(reducer(undefined, {
      type: '@@geo/GET_INIT',
    })).toStrictEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle GET_FAILURE', () => {
    expect(reducer(undefined, {
      type: '@@geo/GET_FAILURE',
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
      type: '@@geo/GET_SUCCESS',
      payload: {} as tGeo,
    })).toStrictEqual({
      error: null,
      fetched: true,
      isLoading: false,
      data: {},
    });
  });
});
