import { memoize } from 'redux-memoize';
import { Dispatch } from 'redux';
import { agent } from '../../../utils';

import {
  getUsersByOrgBegin,
  getUsersByOrgSuccess,
  getUsersByOrgFailure,
} from './actions';

export const getUsersByOrg = memoize({ ttl: 300 },
  (id: number, limit?: number, offset?: number) => {
    const prefix = __DEV__
      ? 'https://127.0.0.1:3001/api/v1/usersByOrg'
      : '/api/v1/usersByOrg';

    return async function <S>(dispatch: Dispatch<S>) {
      dispatch(getUsersByOrgBegin());

      try {
        const query = `?id=${id}`;
        const limitStr = limit ? `&limit=${limit}` : '';
        const offsetStr = offset ? `&offset=${offset}` : '';
        const qs = `${prefix}${query}${limitStr}${offsetStr}`;

        // @ts-ignore
        const result = await fetch(qs, { agent });
        const json = await result.json();
        return dispatch(getUsersByOrgSuccess(json));
      } catch (err) {
        return dispatch(getUsersByOrgFailure(err));
      }
    };
  });
