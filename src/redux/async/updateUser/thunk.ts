
import { memoize } from 'redux-memoize';

import { agent, objToQueryString } from '../../../utils';
import {
  updateUserBegin,
  updateUserFailure,
  updateUserSuccess,
} from './actions';

const endpoint = '/api/v1/user';
const prefix = __CLIENT__ ? endpoint : `${__URL__}${endpoint}`;

export const updateUser = memoize({ ttl: 300 }, (user: tUser) => {
  return async function (dispatch: Function) {
    dispatch(updateUserBegin());

    try {
      const qs = objToQueryString(user);

      // we do it this way so errors can bubble properly to our middleware
      const result = await fetch(`${prefix}?${qs}`, {
        // @ts-ignore
        agent,
        // we need credentials here so that the session cookie gets set properly
        credentials: __DEV__ ? 'include' : 'same-origin',
        method: 'PATCH',
      })
        .then((response: tFetchResponse) => {
          if (!response.ok) throw response;
          return response.json();
        });

      return dispatch(updateUserSuccess(result));
    } catch (err) {
      return dispatch(updateUserFailure(err));
    }
  };
});
