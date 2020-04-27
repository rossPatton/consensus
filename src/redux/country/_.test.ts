import * as types from './_types';
import {countryReducer as reducer, initialState} from './reducer';

describe('redux/country/reducer', () => {
  it('should return initial state, even with a bunk action', () => {
    expect(reducer(undefined, {} as types.tActions))
      .toStrictEqual(initialState);
  });

  it('should handle GET_FAILURE', () => {
    expect(reducer(undefined, {
      type: '@@country/GET_FAILURE',
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
      type: '@@country/GET_SUCCESS',
      payload: {} as tCountry,
    })).toStrictEqual({
      error: null,
      fetched: true,
      isLoading: false,
      data: {},
    });
  });
});
