import * as types from './_types';
import {initialState, invitesReducer as reducer} from './reducer';

describe('redux/invites/reducer', () => {
  it('should return initial state, even with a bunk action', () => {
    expect(reducer(undefined, {} as types.tActions))
      .toStrictEqual(initialState);
  });

  it('should handle DELETE_INIT', () => {
    expect(reducer(undefined, {
      type: '@@invites/DELETE_INIT',
    })).toStrictEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle DELETE_FAILURE', () => {
    expect(reducer(undefined, {
      type: '@@invites/DELETE_FAILURE',
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
      type: '@@invites/DELETE_SUCCESS',
      payload: {
        id: 1,
        groupId: 1,
        userId: 1,
      } as ts.userInvite,
    })).toStrictEqual({
      ...initialState,
      data: [],
    });
  });

  it('should handle GET_INIT', () => {
    expect(reducer(undefined, {
      type: '@@invites/GET_INIT',
    })).toStrictEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle GET_FAILURE', () => {
    expect(reducer(undefined, {
      type: '@@invites/GET_FAILURE',
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
      type: '@@invites/GET_SUCCESS',
      payload: [{}] as ts.userInvite[],
    })).toStrictEqual({
      ...initialState,
      fetched: true,
      data: [{}],
    });
  });

  it('should handle POST_INIT', () => {
    expect(reducer(undefined, {
      type: '@@invites/POST_INIT',
    })).toStrictEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle POST_FAILURE', () => {
    expect(reducer(undefined, {
      type: '@@invites/POST_FAILURE',
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
      type: '@@invites/POST_SUCCESS',
      payload: {} as ts.userInvite,
    })).toStrictEqual({
      ...initialState,
      data: [{}],
    });
  });
});
