import { Dispatch } from 'redux';
import { memoize } from 'redux-memoize';

import { agent, objToQueryString } from '../../../utils';
import {
  authenticateBegin,
  authenticateFailure,
  authenticateSuccess,
  logOutBegin,
  logOutFailure,
  logOutSuccess,
} from './actions';

export const authenticateSession = memoize({ttl: 300}, (account: tLogin) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(authenticateBegin());

    try {
      const prefix = `${__URL__}/auth/login`;
      const qs = objToQueryString(account);

      // we do it this way so errors can bubble properly to our middleware
      const result: tSession = await fetch(`${prefix}?${qs}`, {
        // @ts-ignore
        agent,
        // we need credentials here so that the session cookie gets set properly
        credentials: __DEV__ ? 'include' : 'same-origin',
        method: 'POST',
      })
        .then((response: tFetchResponse) => {
          if (!response.ok) throw response;
          return response.json();
        });

      return dispatch(authenticateSuccess(result));
    } catch (err) {
      return dispatch(authenticateFailure(err));
    }
  };
});

export const logOutOfSession = memoize({ttl: 300}, () => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(logOutBegin());

    try {
      // we do it this way so errors can bubble properly to our middleware
      const result: tSession = await fetch(`${__URL__}/auth/logout`, {
        // @ts-ignore
        agent,
        // we need credentials here so that the session cookie gets set properly
        credentials: __DEV__ ? 'include' : 'same-origin',
      })
        .then((response: tFetchResponse) => {
          if (!response.ok) throw response;
          return response.json();
        });

      return dispatch(logOutSuccess(result));
    } catch (err) {
      return dispatch(logOutFailure(err));
    }
  };
});
