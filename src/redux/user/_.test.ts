import * as types from './_types';
import {initialState, userReducer as reducer} from './reducer';

describe('redux/user/reducer', () => {
  it('should return initial state, even with a bunk action', () => {
    expect(reducer(undefined, {} as types.tActions))
      .toStrictEqual(initialState);
  });

  it('should handle DELETE_INIT', () => {
    expect(reducer(undefined, {
      type: '@@user/DELETE_INIT',
    })).toStrictEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle DELETE_FAILURE', () => {
    expect(reducer(undefined, {
      type: '@@user/DELETE_FAILURE',
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
      type: '@@user/DELETE_SUCCESS',
      payload: {} as tUser,
    })).toStrictEqual({
      ...initialState,
      fetched: true,
      data: {},
    });
  });

  it('should handle GET_INIT', () => {
    expect(reducer(undefined, {
      type: '@@user/GET_INIT',
    })).toStrictEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle GET_FAILURE', () => {
    expect(reducer(undefined, {
      type: '@@user/GET_FAILURE',
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
      type: '@@user/GET_SUCCESS',
      payload: {} as tUser,
    })).toStrictEqual({
      ...initialState,
      fetched: true,
      data: {},
    });
  });

  it('should handle PATCH_INIT', () => {
    expect(reducer(undefined, {
      type: '@@user/PATCH_INIT',
    })).toStrictEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle PATCH_FAILURE', () => {
    expect(reducer(undefined, {
      type: '@@user/PATCH_FAILURE',
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

  it('should handle PATCH_SUCCESS', () => {
    expect(reducer(undefined, {
      type: '@@user/PATCH_SUCCESS',
      payload: {} as tUser,
    })).toStrictEqual({
      ...initialState,
      fetched: true,
      data: {},
    });
  });

  it('should handle POST_INIT', () => {
    expect(reducer(undefined, {
      type: '@@user/POST_INIT',
    })).toStrictEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle POST_FAILURE', () => {
    expect(reducer(undefined, {
      type: '@@user/POST_FAILURE',
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
      type: '@@user/POST_SUCCESS',
      payload: {} as tUser,
    })).toStrictEqual({
      ...initialState,
      fetched: true,
      data: {},
    });
  });
});
