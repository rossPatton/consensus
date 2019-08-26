import { memoize } from 'redux-memoize';
import { Dispatch } from 'redux';
import { agent, objToQueryString } from '../../../utils';

import {
  getDecisionsByOrgBegin,
  getDecisionsByOrgSuccess,
  getDecisionsByOrgFailure,
} from './actions';

export const getDecisionsByOrg = memoize({ ttl: 300 }, (queryObj: tIdQuery) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(getDecisionsByOrgBegin());

    const prefix = __DEV__ ?
      'https://127.0.0.1:3001/api/v1/decisionsByOrg' :
      '/api/v1/decisionsByOrg';

    try {
      const qs = objToQueryString(queryObj as any);

      // @ts-ignore
      const result = await fetch(`${prefix}${qs}`, {agent})
        .then((response: any) => {
          if (!response.ok) throw response;
          return response.json();
        });

      return dispatch(getDecisionsByOrgSuccess(result));
    } catch (err) {
      return dispatch(getDecisionsByOrgFailure(err));
    }
  };
});
