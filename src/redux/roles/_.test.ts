import * as types from './_types';
import {initialState, rolesReducer as reducer} from './reducer';

describe('redux/roles/reducer', () => {
  it('should return initial state, even with a bunk action', () => {
    expect(reducer(undefined, {} as types.tActions))
      .toStrictEqual(initialState);
  });

  it('should handle DELETE_INIT', () => {
    expect(reducer(undefined, {
      type: '@@roles/DELETE_INIT',
    })).toStrictEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle DELETE_FAILURE', () => {
    expect(reducer(undefined, {
      type: '@@roles/DELETE_FAILURE',
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
      type: '@@roles/DELETE_SUCCESS',
      payload: {groupId: 1, role: 'facilitator'},
    })).toStrictEqual({
      ...initialState,
      data: [],
    });
  });

  it('should handle GET_INIT', () => {
    expect(reducer(undefined, {
      type: '@@roles/GET_INIT',
    })).toStrictEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle GET_FAILURE', () => {
    expect(reducer(undefined, {
      type: '@@roles/GET_FAILURE',
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
      type: '@@roles/GET_SUCCESS',
      payload: [{groupId: 1, role: 'facilitator'}],
    })).toStrictEqual({
      ...initialState,
      fetched: true,
      data: [{groupId: 1, role: 'facilitator'}],
    });
  });

  it('should handle POST_INIT', () => {
    expect(reducer(undefined, {
      type: '@@roles/POST_INIT',
    })).toStrictEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle POST_FAILURE', () => {
    expect(reducer(undefined, {
      type: '@@roles/POST_FAILURE',
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
      type: '@@roles/POST_SUCCESS',
      payload: {groupId: 1, role: 'member'},
    })).toStrictEqual({
      ...initialState,
      data: [{groupId: 1, role: 'member'}],
    });
  });
});
