import { memoize } from 'redux-memoize';
import { Dispatch } from 'redux';
import { agent, objToQueryString } from '../../../utils';

import {
  getUsersByOrgBegin,
  getUsersByOrgSuccess,
  getUsersByOrgFailure,
} from './actions';

export const getUsersByOrg = memoize({ ttl: 300 }, (queryObj: tIdQuery) => {
  const prefix = __DEV__
    ? 'https://127.0.0.1:3001/api/v1/usersByOrg'
    : '/api/v1/usersByOrg';

  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(getUsersByOrgBegin());

    try {
      const qs = objToQueryString(queryObj as any);

      // @ts-ignore
      const result = await fetch(`${prefix}?${qs}`, {agent})
        .then((response: any) => {
          if (!response.ok) throw response;
          return response.json();
        });

      return dispatch(getUsersByOrgSuccess(result));
    } catch (err) {
      return dispatch(getUsersByOrgFailure(err));
    }
  };
});
