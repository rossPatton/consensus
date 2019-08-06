import { memoize } from 'redux-memoize';
import { Dispatch } from 'redux';
import { agent } from '../../../utils';

import {
  registerUserBegin,
  registerUserSuccess,
  registerUserFailure,
} from './actions';

export const registerUser = memoize({ ttl: 300 }, (user: tUser) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(registerUserBegin());

    try {
      const prefix = __DEV__ ?
        'https://127.0.0.1:3001/api/v1/user' :
        '/api/v1/user';

      const { email, password, username, fname, lname } = user;
      const qs = `?email=${email}&password=${password}&username=${username}&fname=${fname}&lname=${lname}`;

      // @ts-ignore
      const result = await fetch(`${prefix}${qs}`, {
        // @ts-ignore
        agent,
        method: 'POST',
      });
      const json = await result.json();
      return dispatch(registerUserSuccess(json));
    } catch (err) {
      return dispatch(registerUserFailure(err));
    }
  };
});
