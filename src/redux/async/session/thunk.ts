import { memoize } from 'redux-memoize';
import { Dispatch } from 'redux';
import { agent } from '../../../utils';

import {
  authenticateBegin,
  authenticateSuccess,
  authenticateFailure,
} from './actions';

export const authenticateSession = memoize({ ttl: 300 }, (user: tLogin) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(authenticateBegin(user));

    try {
      const prefix = __DEV__ ?
        'https://127.0.0.1:3001/auth/user/login' :
        '/auth/user/login';

      const { username, password } = user;
      const qs = `?username=${username}&password=${password}`;

      // we do it this way so errors can bubble properly to our middleware
      const result: tUser & tAuth = await fetch(`${prefix}${qs}`, {
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
