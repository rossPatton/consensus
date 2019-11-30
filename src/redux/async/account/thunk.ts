import { Dispatch } from 'redux';
import { memoize } from 'redux-memoize';

import { agent, objToQueryString } from '../../../utils';
import {
  patchAccountBegin,
  patchAccountFailure,
  patchAccountSuccess,
} from './actions';

const endpoint = '/api/v1/account';
const prefix = __CLIENT__ ? endpoint : `${__URL__}${endpoint}`;

// TODO a lot of this thunk logic gets repeated a lot... should consolidate
export const patchAccount = memoize({ ttl: 300 }, (account: tAccount) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(patchAccountBegin());

    try {
      const qs = objToQueryString(account);

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

      return dispatch(patchAccountSuccess(result));
    } catch (err) {
      return dispatch(patchAccountFailure(err));
    }
  };
});
