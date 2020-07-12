import * as types from './_types';
import {emailsReducer as reducer, initialState} from './reducer';

describe('redux/emails/reducer', () => {
  it('should return initial state, even with a bunk action', () => {
    expect(reducer(undefined, {} as types.tActions))
      .toStrictEqual(initialState);
  });

  it('should handle POST_INIT', () => {
    expect(reducer(undefined, {
      type: '@@emails/POST_INIT',
    })).toStrictEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle POST_FAILURE', () => {
    expect(reducer(undefined, {
      type: '@@emails/POST_FAILURE',
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

  it('should handle POST_SUCCESS', () => {
    expect(reducer(undefined, {
      type: '@@emails/POST_SUCCESS',
      payload: {test: ''},
    })).toStrictEqual({
      ...initialState,
      data: {test: ''},
    });
  });
});
