import { memoize } from 'redux-memoize';
import { Dispatch } from 'redux';
import { agent, objToQueryString } from '../../../utils';

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

      const qs = objToQueryString(user);

      // we do it this way so errors can bubble properly to our middleware
      const result = await fetch(`${prefix}?${qs}&client=true`, {
        // @ts-ignore
        agent,
        method: 'POST',
      }).then((response: any) => {
        if (!response.ok) throw response;
        return response.json();
      });

      return dispatch(registerUserSuccess(result));
    } catch (err) {
      return dispatch(registerUserFailure(err));
    }
  };
});
