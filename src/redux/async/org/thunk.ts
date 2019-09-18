import { Dispatch } from 'redux';
import { memoize } from 'redux-memoize';

import {agent, objToQueryString} from '../../../utils';
import {
  getOrgBegin,
  getOrgFailure,
  getOrgSuccess,
  patchOrgBegin,
  patchOrgFailure,
  patchOrgSuccess,
} from './actions';

const prefix = `${__URL__}/api/v1/org`;

export const getOrg = memoize({ ttl: 300 }, (params: tOrgRouteParams) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(getOrgBegin());

    try {
      const {section, page, ...restParams} = params;
      const qs = objToQueryString(restParams);

      const isByID = !!params.id;
      const prefixWId = `${prefix}${isByID ? 'ById' : ''}`;

      // @ts-ignore
      const result = await fetch(`${prefixWId}?${qs}`, {agent})
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

export const patchOrg = memoize({ ttl: 300 }, (params: tOrgRouteParams) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(patchOrgBegin());

    try {
      const {section, page, ...restParams} = params;
      const qs = objToQueryString(restParams);

      // @ts-ignore
      const result = await fetch(`${prefix}?${qs}`, {agent, method: 'PATCH'})
        .then((response: tFetchResponse) => {
          if (!response.ok) throw response;
          return response.json();
        });

      return dispatch(patchOrgSuccess(result));
    } catch (err) {
      return dispatch(patchOrgFailure(err));
    }
  };
});

export const postOrg = memoize({ ttl: 300 }, (params: tOrgRouteParams) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(patchOrgBegin());

    try {
      const {section, page, ...restParams} = params;
      const qs = objToQueryString(restParams);

      // @ts-ignore
      const result = await fetch(`${prefix}?${qs}`, {agent, method: 'POST'})
        .then((response: tFetchResponse) => {
          if (!response.ok) throw response;
          return response.json();
        });

      return dispatch(patchOrgSuccess(result));
    } catch (err) {
      return dispatch(patchOrgFailure(err));
    }
  };
});
