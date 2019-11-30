import {Dispatch} from 'redux';
import {memoize} from 'redux-memoize';

import {agent, objToQueryString} from '../../../utils';
import {
  deleteOrgByUserBegin,
  deleteOrgByUserFailure,
  deleteOrgByUserSuccess,
  getOrgsByUserBegin,
  getOrgsByUserFailure,
  getOrgsByUserSuccess,
} from './actions';

const endpoint = '/api/v1/orgsByUser';
const prefix = __CLIENT__ ? endpoint : `${__URL__}${endpoint}`;

export const getOrgsBySession = memoize({ttl: 300}, () => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(getOrgsByUserBegin());

    try {
      const endpoint = '/api/v1/orgsBySession';
      const url = __CLIENT__ ? endpoint : `${__URL__}${endpoint}`;

      // @ts-ignore
      const result = await fetch(url, {agent})
        .then((response: tFetchResponse) => {
          if (!response.ok) throw response;
          return response.json();
        });

      return dispatch(getOrgsByUserSuccess(result));
    } catch (err) {
      return dispatch(getOrgsByUserFailure(err));
    }
  };
});

export const getOrgsByUser = memoize({ttl: 300}, (query: tIdQuery) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(getOrgsByUserBegin());

    try {
      const qs = objToQueryString(query);

      // @ts-ignore
      const result = await fetch(`${prefix}?${qs}`, {agent})
        .then((response: tFetchResponse) => {
          if (!response.ok) throw response;
          return response.json();
        });

      return dispatch(getOrgsByUserSuccess(result));
    } catch (err) {
      return dispatch(getOrgsByUserFailure(err));
    }
  };
});

export const deleteOrgByUser = memoize({ttl: 300}, (queryObj: tIdQuery) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(deleteOrgByUserBegin());

    try {
      const qs = objToQueryString(queryObj);

      // @ts-ignore
      const result = await fetch(`${prefix}?${qs}`, {agent, method: 'DELETE'})
        .then((response: tFetchResponse) => {
          if (!response.ok) throw response;
          return response.json();
        });

      return dispatch(deleteOrgByUserSuccess(result));
    } catch (err) {
      return dispatch(deleteOrgByUserFailure(err));
    }
  };
});
