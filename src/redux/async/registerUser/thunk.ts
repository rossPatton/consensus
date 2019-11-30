import { Dispatch } from 'redux';
import { memoize } from 'redux-memoize';

import { agent, objToQueryString } from '../../../utils';
import {
  registerUserBegin,
  registerUserFailure,
  registerUserSuccess,
} from './actions';

const endpoint = '/api/v1/user';
const prefix = __CLIENT__ ? endpoint : `${__URL__}${endpoint}`;

export const registerUser = memoize({ ttl: 300 }, (user: tUser) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(registerUserBegin());

    try {
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
