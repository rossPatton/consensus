import { Dispatch } from 'redux';
import { memoize } from 'redux-memoize';

import { agent, objToQueryString } from '../../../utils';
import {
  getDecisionBegin,
  getDecisionFailure,
  getDecisionSuccess,
  postDecisionBegin,
  postDecisionFailure,
  postDecisionSuccess,
} from './actions';

const endpoint = '/api/v1/decision';
const prefix = __CLIENT__ ? endpoint : `${__URL__}${endpoint}`;

export const getDecision = memoize({ttl: 300}, (queryObj: tIdQuery) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(getDecisionBegin());

    try {
      const qs = objToQueryString(queryObj);

      // @ts-ignore
      const result = await fetch(`${prefix}?${qs}`, {agent})
        .then((response: tFetchResponse) => {
          if (!response.ok) throw response;
          return response.json();
        });
      return dispatch(getDecisionSuccess(result));
    } catch (err) {
      return dispatch(getDecisionFailure(err));
    }
  };
});

export const postDecision = memoize({ttl: 300}, (queryObj: tIdQuery) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(postDecisionBegin());

    try {
      const qs = objToQueryString(queryObj);

      // @ts-ignore
      const result = await fetch(`${prefix}?${qs}`, {agent, method: 'POST'})
        .then((response: tFetchResponse) => {
          if (!response.ok) throw response;
          return response.json();
        });


      return dispatch(postDecisionSuccess(result));
    } catch (err) {
      return dispatch(postDecisionFailure(err));
    }
  };
});
