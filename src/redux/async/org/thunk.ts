import { Dispatch } from 'redux';
import { memoize } from 'redux-memoize';

import { agent, objToQueryString } from '../../../utils';
import {
  getOrgBegin,
  getOrgFailure,
  getOrgSuccess,
} from './actions';

export const getOrg = memoize({ ttl: 300 }, (params: tOrgRouteParams) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(getOrgBegin());

    try {
      const {section, page, ...restParams} = params;
      const qs = objToQueryString(restParams);

      const isByID = !!params.id;
      const prefix = `${__URL__}/api/v1/org${isByID ? 'ById' : ''}`;

      // @ts-ignore
      const result = await fetch(`${prefix}?${qs}`, {agent})
        .then((response: tFetchResponse) => {
          if (!response.ok) throw response;
          return response.json();
        });

      return dispatch(getOrgSuccess(result));
    } catch (err) {
      return dispatch(getOrgFailure(err));
    }
  };
});
