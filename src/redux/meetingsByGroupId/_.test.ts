import * as types from './_types';
import {initialState, meetingsByGroupIdReducer as reducer} from './reducer';

describe('redux/meetingsByGroupId/reducer', () => {
  it('should return initial state, even with a bunk action', () => {
    expect(reducer(undefined, {} as types.tActions))
      .toStrictEqual(initialState);
  });

  it('should handle DELETE_INIT', () => {
    expect(reducer(undefined, {
      type: '@@meetingsByGroupId/DELETE_INIT',
    })).toStrictEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle DELETE_FAILURE', () => {
    expect(reducer(undefined, {
      type: '@@meetingsByGroupId/DELETE_FAILURE',
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

  it('should handle DELETE_SUCCESS', () => {
    expect(reducer(undefined, {
      type: '@@meetingsByGroupId/DELETE_SUCCESS',
      payload: {id: 1},
    })).toStrictEqual({
      ...initialState,
      data: [],
    });
  });

  it('should handle GET_INIT', () => {
    expect(reducer(undefined, {
      type: '@@meetingsByGroupId/GET_INIT',
    })).toStrictEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle GET_FAILURE', () => {
    expect(reducer(undefined, {
      type: '@@meetingsByGroupId/GET_FAILURE',
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
      type: '@@meetingsByGroupId/GET_SUCCESS',
      payload: [{}] as ts.meeting[],
    })).toStrictEqual({
      ...initialState,
      fetched: true,
      data: [{}],
    });
  });
});
