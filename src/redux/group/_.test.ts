import * as types from './_types';
import {groupReducer as reducer, initialState} from './reducer';

describe('redux/group/reducer', () => {
  it('should return initial state, even with a bunk action', () => {
    expect(reducer(undefined, {} as types.tActions))
      .toStrictEqual(initialState);
  });

  // it('should handle GET_INIT', () => {
  //   expect(reducer(undefined, {
  //     type: '@@group/GET_INIT',
  //   })).toStrictEqual({
  //     ...initialState,
  //     isLoading: true,
  //   });
  // });

  it('should handle GET_FAILURE', () => {
    expect(reducer(undefined, {
      type: '@@group/GET_FAILURE',
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
      type: '@@group/GET_SUCCESS',
      payload: {} as ts.group,
    })).toStrictEqual({
      error: null,
      fetched: true,
      isLoading: false,
      data: {},
    });
  });

  it('should handle PATCH_FAILURE', () => {
    expect(reducer(undefined, {
      type: '@@group/PATCH_FAILURE',
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

  it('should handle PATCH_SUCCESS', () => {
    expect(reducer(undefined, {
      type: '@@group/PATCH_SUCCESS',
      payload: {} as ts.group,
    })).toStrictEqual({
      error: null,
      fetched: true,
      isLoading: false,
      data: {},
    });
  });

  it('should handle POST_FAILURE', () => {
    expect(reducer(undefined, {
      type: '@@group/POST_FAILURE',
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

  it('should handle POST_SUCCESS', () => {
    expect(reducer(undefined, {
      type: '@@group/POST_SUCCESS',
      payload: {} as ts.group,
    })).toStrictEqual({
      error: null,
      fetched: true,
      isLoading: false,
      data: {},
    });
  });
});
