import {Dispatch} from 'redux';
import {memoize} from 'redux-memoize';

import {agent, objToQueryString} from '../../../utils';
import {
  deleteUserByOrgBegin,
  deleteUserByOrgFailure,
  deleteUserByOrgSuccess,
  getUsersByOrgBegin,
  getUsersByOrgFailure,
  getUsersByOrgSuccess,
  postUserByOrgBegin,
  postUserByOrgFailure,
  postUserByOrgSuccess,
} from './actions';

const prefix = `${__URL__}/api/v1/usersByOrg`;

export const getUsersByOrg = memoize({ttl: 300}, (queryObj: tIdQuery) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(getUsersByOrgBegin());

    try {
      const qs = objToQueryString(queryObj);

      // @ts-ignore
      const result = await fetch(`${prefix}?${qs}`, {agent})
        .then((response: tFetchResponse) => {
          if (!response.ok) throw response;
          return response.json();
        });

      return dispatch(getUsersByOrgSuccess(result));
    } catch (err) {
      return dispatch(getUsersByOrgFailure(err));
    }
  };
});

export const postNewUserByOrg = memoize({ttl: 300}, (queryObj: tIdQuery) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(postUserByOrgBegin());

    try {
      const qs = objToQueryString(queryObj);

      // @ts-ignore
      const result = await fetch(`${prefix}?${qs}`, {agent, method: 'POST'})
        .then((response: tFetchResponse) => {
          if (!response.ok) throw response;
          return response.json();
        });

      return dispatch(postUserByOrgSuccess(result));
    } catch (err) {
      return dispatch(postUserByOrgFailure(err));
    }
  };
});

export const deleteUserByOrg = memoize({ttl: 300}, (queryObj: tIdQuery) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(deleteUserByOrgBegin());

    try {
      const qs = objToQueryString(queryObj);

      // @ts-ignore
      const result = await fetch(`${prefix}?${qs}`, {agent, method: 'DELETE'})
        .then((response: tFetchResponse) => {
          if (!response.ok) throw response;
          return response.json();
        });

      return dispatch(deleteUserByOrgSuccess(result));
    } catch (err) {
      return dispatch(deleteUserByOrgFailure(err));
    }
  };
});
