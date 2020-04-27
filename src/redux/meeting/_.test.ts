import * as types from './_types';
import {initialState, meetingReducer as reducer} from './reducer';

describe('redux/meeting/reducer', () => {
  it('should return initial state, even with a bunk action', () => {
    expect(reducer(undefined, {} as types.tActions))
      .toStrictEqual(initialState);
  });

  it('should handle GET_INIT', () => {
    expect(reducer(undefined, {
      type: '@@meeting/GET_INIT',
    })).toStrictEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle GET_FAILURE', () => {
    expect(reducer(undefined, {
      type: '@@meeting/GET_FAILURE',
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
      type: '@@meeting/GET_SUCCESS',
      payload: {} as ts.meetingSingular,
    })).toStrictEqual({
      ...initialState,
      fetched: true,
      data: {},
    });
  });

  it('should handle PATCH_INIT', () => {
    expect(reducer(undefined, {
      type: '@@meeting/PATCH_INIT',
    })).toStrictEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle PATCH_FAILURE', () => {
    expect(reducer(undefined, {
      type: '@@meeting/PATCH_FAILURE',
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
      type: '@@meeting/PATCH_SUCCESS',
      payload: {} as ts.meetingSingular,
    })).toStrictEqual({
      ...initialState,
      fetched: true,
      data: {},
    });
  });

  it('should handle POST_INIT', () => {
    expect(reducer(undefined, {
      type: '@@meeting/POST_INIT',
    })).toStrictEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle POST_FAILURE', () => {
    expect(reducer(undefined, {
      type: '@@meeting/POST_FAILURE',
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
      type: '@@meeting/POST_SUCCESS',
      payload: {} as ts.meetingSingular,
    })).toStrictEqual({
      ...initialState,
      fetched: true,
      data: {},
    });
  });
});
