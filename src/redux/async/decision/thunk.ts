import { Dispatch } from 'redux';
import { memoize } from 'redux-memoize';

import { agent, objToQueryString } from '../../../utils';
import {
  getDecisionsByOrgBegin,
  getDecisionsByOrgFailure,
  getDecisionsByOrgSuccess,
} from './actions';

const prefix = `${__URL__}/api/v1/decision`;

export const getDecision = memoize({ttl: 300}, (queryObj: tIdQuery) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(getDecisionsByOrgBegin());

    try {
      const qs = objToQueryString(queryObj);

      // @ts-ignore
      const result = await fetch(`${prefix}?${qs}`, {agent})
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