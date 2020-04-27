import * as types from './_types';
import {initialState, usersByGroupIdReducer as reducer} from './reducer';

describe('redux/usersByGroupId/reducer', () => {
  it('should return initial state, even with a bunk action', () => {
    expect(reducer(undefined, {} as types.tActions))
      .toStrictEqual(initialState);
  });

  it('should handle DELETE_INIT', () => {
    expect(reducer(undefined, {
      type: '@@usersByGroupId/DELETE_INIT',
    })).toStrictEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle DELETE_FAILURE', () => {
    expect(reducer(undefined, {
      type: '@@usersByGroupId/DELETE_FAILURE',
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
      type: '@@usersByGroupId/DELETE_SUCCESS',
      payload: {userId: 1},
    })).toStrictEqual({
      ...initialState,
      data: [],
    });
  });

  it('should handle GET_INIT', () => {
    expect(reducer(undefined, {
      type: '@@usersByGroupId/GET_INIT',
    })).toStrictEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle GET_FAILURE', () => {
    expect(reducer(undefined, {
      type: '@@usersByGroupId/GET_FAILURE',
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
      type: '@@usersByGroupId/GET_SUCCESS',
      payload: [{}] as tUser[],
    })).toStrictEqual({
      ...initialState,
      fetched: true,
      data: [{}],
    });
  });

  it('should handle PATCH_INIT', () => {
    expect(reducer(undefined, {
      type: '@@usersByGroupId/PATCH_INIT',
    })).toStrictEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle PATCH_FAILURE', () => {
    expect(reducer(undefined, {
      type: '@@usersByGroupId/PATCH_FAILURE',
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
      type: '@@usersByGroupId/PATCH_SUCCESS',
      payload: {} as ts.roleRel,
    })).toStrictEqual({
      ...initialState,
      data: [],
    });
  });

  it('should handle POST_INIT', () => {
    expect(reducer(undefined, {
      type: '@@usersByGroupId/POST_INIT',
    })).toStrictEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle POST_FAILURE', () => {
    expect(reducer(undefined, {
      type: '@@usersByGroupId/POST_FAILURE',
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
      type: '@@usersByGroupId/POST_SUCCESS',
      payload: {} as tUser,
    })).toStrictEqual({
      ...initialState,
      data: [{}],
    });
  });
});
