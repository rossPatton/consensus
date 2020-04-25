import * as types from './_types';
import {groupsReducer as reducer, initialState} from './reducer';

describe('redux/groups/reducer', () => {
  it('should return initial state, even with a bunk action', () => {
    expect(reducer(undefined, {} as types.tActionUnion))
      .toStrictEqual(initialState);
  });

  it('should handle GET_INIT', () => {
    expect(reducer(undefined, {
      type: '@@groups/GET_INIT',
    })).toStrictEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle GET_FAILURE', () => {
    expect(reducer(undefined, {
      type: '@@groups/GET_FAILURE',
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
      data: [],
    });
  });

  it('should handle GET_SUCCESS', () => {
    expect(reducer(undefined, {
      type: '@@groups/GET_SUCCESS',
      payload: [{}] as tGroup[],
    })).toStrictEqual({
      error: null,
      fetched: true,
      isLoading: false,
      data: [{}],
    });
  });
});
