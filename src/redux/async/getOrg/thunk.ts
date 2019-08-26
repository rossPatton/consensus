import { memoize } from 'redux-memoize';
import { Dispatch } from 'redux';

import { agent, objToQueryString } from '../../../utils';

import {
  getOrgBegin,
  getOrgSuccess,
  getOrgFailure,
} from './actions';

export const getOrg = memoize({ ttl: 300 }, (params: tOrgRouteParams) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(getOrgBegin());

    try {
      const prefix = __DEV__ ?
        'https://127.0.0.1:3001/api/v1/org' :
        '/api/v1/org';

      const {section, page, ...restParams} = params;
      const qs = objToQueryString(restParams as any);

      // @ts-ignore
      const result = await fetch(`${prefix}?${qs}`, {agent})
        .then((response: any) => {
          if (!response.ok) throw response;
          return response.json();
        });

      return dispatch(getOrgSuccess(result));
    } catch (err) {
      return dispatch(getOrgFailure(err));
    }
  };
});
