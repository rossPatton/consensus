import { Dispatch } from 'redux';
import { memoize } from 'redux-memoize';

import { agent, objToQueryString } from '../../../utils';
import {
  getUsersByOrgBegin,
  getUsersByOrgFailure,
  getUsersByOrgSuccess,
} from './actions';

export const getUsersByOrg = memoize({ttl: 300}, (queryObj: tIdQuery) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(getUsersByOrgBegin());

    try {
      const prefix = `${__URL__}/api/v1/usersByOrg`;
      const qs = objToQueryString(queryObj);

      // @ts-ignore
      const result = await fetch(`${prefix}?${qs}`, {agent})
        .then((response: tFetchResponse) => {
          if (!response.ok) throw response;
          return response.json();
        });

      return dispatch(getUsersByOrgSuccess(result));
    } catch (err) {
      return dispatch(getUsersByOrgFailure(err));
    }
  };
});
