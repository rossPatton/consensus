import { Dispatch } from 'redux';
import { memoize } from 'redux-memoize';

import { agent, objToQueryString } from '../../../utils';
import {
  getDecisionsByOrgBegin,
  getDecisionsByOrgFailure,
  getDecisionsByOrgSuccess,
} from './actions';

export const getDecisionsByOrg = memoize({ttl: 300}, (queryObj: tIdQuery) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(getDecisionsByOrgBegin());

    try {
      const qs = objToQueryString(queryObj);

      // @ts-ignore
      const result = await fetch(`/api/v1/decisions?${qs}`, {agent})
        .then((response: tFetchResponse) => {
          if (!response.ok) throw response;
          return response.json();
        });

      return dispatch(getDecisionsByOrgSuccess(result));
    } catch (err) {
      return dispatch(getDecisionsByOrgFailure(err));
    }
  };
});
