import { memoize } from 'redux-memoize';
import { Dispatch } from 'redux';

import { agent } from '../../../utils';

import {
  getOrgBegin,
  getOrgSuccess,
  getOrgFailure,
} from './actions';


export const getOrg = memoize({ ttl: 300 }, (params: tOrgRouteParams) => {
  const { country, state, city, org } = params;

  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(getOrgBegin());

    try {
      const prefix = __DEV__ ?
        'https://127.0.0.1:3001/api/v1/org' :
        '/api/v1/org';

      const qs = `${prefix}?country=${country}&state=${state}&city=${city}&slug=${org}`;
      // @ts-ignore
      const result = await fetch(qs, { agent });
      const json = await result.json();
      return dispatch(getOrgSuccess(json));
    } catch (err) {
      return dispatch(getOrgFailure(err));
    }
  };
});
