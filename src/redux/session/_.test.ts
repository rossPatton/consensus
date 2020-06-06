import * as types from './_types';
import {initialState, sessionReducer as reducer} from './reducer';

describe('redux/session/reducer', () => {
  it('should return initial state, even with a bunk action', () => {
    expect(reducer(undefined, {} as types.tActions))
      .toStrictEqual(initialState);
  });

  it('should handle LOGIN_INIT', () => {
    expect(reducer(undefined, {
      type: '@@session/LOGIN_INIT',
    })).toStrictEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle LOGIN_FAILURE', () => {
    expect(reducer(undefined, {
      type: '@@session/LOGIN_FAILURE',
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

  it('should handle LOGIN_SUCCESS', () => {
    const testSession = {
      isAuthenticated: true,
      profile: {} as ts.user,
      type: 'user',
    } as ts.session;

    expect(reducer(undefined, {
      type: '@@session/LOGIN_SUCCESS',
      payload: testSession,
    })).toStrictEqual({
      ...initialState,
      data: testSession,
    });
  });

  it('should handle LOGOUT_INIT', () => {
    expect(reducer(undefined, {
      type: '@@session/LOGOUT_INIT',
    })).toStrictEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle LOGOUT_FAILURE', () => {
    expect(reducer(undefined, {
      type: '@@session/LOGOUT_FAILURE',
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

  it('should handle LOGOUT_SUCCESS', () => {
    const testSession = {
      isAuthenticated: false,
    } as ts.isAuthenticated;

    expect(reducer(undefined, {
      type: '@@session/LOGOUT_SUCCESS',
      payload: testSession,
    })).toStrictEqual({
      ...initialState,
      data: testSession,
    });
  });

  it('should handle PATCH_FAILURE', () => {
    expect(reducer(undefined, {
      type: '@@session/PATCH_FAILURE',
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
    const testSession = {
      isAuthenticated: true,
      isVerified: true,
      profile: {} as ts.user,
      type: 'user',
    } as ts.session;

    expect(reducer(undefined, {
      type: '@@session/PATCH_SUCCESS',
      payload: testSession,
    })).toStrictEqual({
      ...initialState,
      data: testSession,
    });
  });
});
