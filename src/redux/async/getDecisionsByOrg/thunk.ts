import { memoize } from 'redux-memoize';
import { Dispatch } from 'redux';
import { agent } from '../../../utils';

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
      const { id, limit, offset } = queryObj;

      const query = `?id=${id}`;
      const limitStr = limit ? `&limit=${limit}` : '';
      const offsetStr = offset ? `&offset=${offset}` : '';
      const qs = `${prefix}${query}${limitStr}${offsetStr}`;

      // @ts-ignore
      const result = await fetch(qs, { agent });
      const json = await result.json();
      return dispatch(getDecisionsByOrgSuccess(json));
    } catch (err) {
      return dispatch(getDecisionsByOrgFailure(err));
    }
  };
});
