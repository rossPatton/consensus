import * as types from './_types';
import {initialState, meetingsByLocationReducer as reducer} from './reducer';

describe('redux/meetingsByLocation/reducer', () => {
  it('should return initial state, even with a bunk action', () => {
    expect(reducer(undefined, {} as types.tActions))
      .toStrictEqual(initialState);
  });

  it('should handle GET_INIT', () => {
    expect(reducer(undefined, {
      type: '@@meetingsByLocation/GET_INIT',
    })).toStrictEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle GET_FAILURE', () => {
    expect(reducer(undefined, {
      type: '@@meetingsByLocation/GET_FAILURE',
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
      type: '@@meetingsByLocation/GET_SUCCESS',
      payload: [{}] as ts.meeting[],
    })).toStrictEqual({
      ...initialState,
      fetched: true,
      data: [{}],
    });
  });
});
