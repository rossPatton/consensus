import { memoize } from 'redux-memoize';
import { Dispatch } from 'redux';
import { agent, objToQueryString } from '../../../utils';

import {
  updateUserBegin,
  updateUserSuccess,
  updateUserFailure,
} from './actions';

export const updateUser = memoize({ ttl: 300 }, (user: tUser) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(updateUserBegin());

    try {
      const prefix = __DEV__ ?
        'https://127.0.0.1:3001/api/v1/user' :
        '/api/v1/user';

      const qs = objToQueryString(user);

      // we do it this way so errors can bubble properly to our middleware
      const result = await fetch(`${prefix}?${qs}`, {
        // @ts-ignore
        agent,
        // we need credentials here so that the session cookie gets set properly
        credentials: __DEV__ ? 'include' : 'same-origin',
        method: 'PATCH',
      })
        .then((response: any) => {
          if (!response.ok) throw response;
          return response.json();
        });

      return dispatch(updateUserSuccess(result));
    } catch (err) {
      return dispatch(updateUserFailure(err));
    }
  };
});
