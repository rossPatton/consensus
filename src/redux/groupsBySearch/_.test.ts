import * as types from './_types';
import {groupsBySearchReducer as reducer, initialState} from './reducer';

describe('redux/groupsBySearch/reducer', () => {
  it('should return initial state, even with a bunk action', () => {
    expect(reducer(undefined, {} as types.tActionUnion))
      .toStrictEqual(initialState);
  });

  it('should handle GET_INIT', () => {
    expect(reducer(undefined, {
      type: '@@groupsBySearch/GET_INIT',
    })).toStrictEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle GET_FAILURE', () => {
    expect(reducer(undefined, {
      type: '@@groupsBySearch/GET_FAILURE',
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
      type: '@@groupsBySearch/GET_SUCCESS',
      payload: [{}] as tGroup[],
    })).toStrictEqual({
      ...initialState,
      fetched: true,
      data: [{}],
    });
  });
});
