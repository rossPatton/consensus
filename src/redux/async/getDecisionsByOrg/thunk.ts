import { memoize } from 'redux-memoize';
import { Dispatch } from 'redux';
import { agent } from '../../../utils';

import {
  getDecisionsBegin,
  getDecisionsSuccess,
  getDecisionsFailure,
} from './actions';

type tExpectedQuery = {
  id: number,
  limit?: number | 'ALL',
  offset?: number,
};

export const getDecisionsByOrg = memoize({ ttl: 300 }, (queryObj: tExpectedQuery) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(getDecisionsBegin());

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
      return dispatch(getDecisionsSuccess(json));
    } catch (err) {
      return dispatch(getDecisionsFailure(err));
    }
  };
});
