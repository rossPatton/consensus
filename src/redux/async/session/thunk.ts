import { memoize } from 'redux-memoize';
import { Dispatch } from 'redux';
import { agent } from '../../../utils';

import {
  authenticateBegin,
  authenticateSuccess,
  authenticateFailure,
  logOutBegin,
  logOutSuccess,
  logOutFailure,
} from './actions';

export const authenticateSession = memoize({ ttl: 300 }, (user: tLogin) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(authenticateBegin(user));

    try {
      const prefix = __DEV__ ?
        'https://127.0.0.1:3001/auth/login' :
        '/auth/login';

      const { username, password } = user;
      const qs = `?username=${username}&password=${password}`;

      // we do it this way so errors can bubble properly to our middleware
      const result: tSession = await fetch(`${prefix}${qs}`, {
        // @ts-ignore
        agent,
        // we need credentials here so that the session cookie gets set properly
        credentials: __DEV__ ? 'include' : 'same-origin',
        method: 'POST',
      })
        .then((response: any) => {
          if (!response.ok) throw response;
          return response.json();
        });

      return dispatch(authenticateSuccess(result));
    } catch (err) {
      return dispatch(authenticateFailure(err));
    }
  };
});

export const logOutOfSession = memoize({ ttl: 300 }, () => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(logOutBegin());

    try {
      const apiEndpoint = __DEV__ ?
        'https://127.0.0.1:3001/auth/logout' :
        '/auth/logout';

      // we do it this way so errors can bubble properly to our middleware
      const result: tSession = await fetch(apiEndpoint, {
        // @ts-ignore
        agent,
        // we need credentials here so that the session cookie gets set properly
        credentials: __DEV__ ? 'include' : 'same-origin',
      })
        .then((response: any) => {
          if (!response.ok) throw response;
          return response.json();
        });

      return dispatch(logOutSuccess(result));
    } catch (err) {
      return dispatch(logOutFailure(err));
    }
  };
});
