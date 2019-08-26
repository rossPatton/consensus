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
      const prefix = `${__URL__}/api/v1/user`;
      const qs = objToQueryString(user);

      // we do it this way so errors can bubble properly to our middleware
      const result = await fetch(`${prefix}?${qs}`, {
        // @ts-ignore
        agent,
        method: 'POST',
      }).then((response: tFetchResponse) => {
        if (!response.ok) throw response;
        return response.json();
      });

      return dispatch(registerUserSuccess(result));
    } catch (err) {
      return dispatch(registerUserFailure(err));
    }
  };
});
