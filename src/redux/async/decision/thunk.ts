import { Dispatch } from 'redux';
import { memoize } from 'redux-memoize';

import { agent, objToQueryString } from '../../../utils';
import {
  getDecisionsByOrgBegin,
  getDecisionsByOrgFailure,
  getDecisionsByOrgSuccess,
  postDecisionBegin,
  postDecisionFailure,
  postDecisionSuccess,
} from './actions';

const prefix = '/api/v1/decision';

export const getDecision = memoize({ttl: 300}, (queryObj: tIdQuery) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(getDecisionsByOrgBegin());

    try {
      const qs = objToQueryString(queryObj);

      // @ts-ignore
      const result = await fetch(`${prefix}?${qs}`, {agent})
        .then((response: tFetchResponse) => {
          if (!response.ok) throw response;
          return response.json();
        });

      return dispatch(getDecisionsByOrgSuccess(result));
    } catch (err) {
      return dispatch(getDecisionsByOrgFailure(err));
    }
  };
});

export const postDecision = memoize({ttl: 300}, (queryObj: tIdQuery) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(postDecisionBegin());

    console.log('\n\npost query => ', queryObj);

    try {
      const qs = objToQueryString(queryObj);
      console.log('qs => ', qs);

      // @ts-ignore
      const result = await fetch(`${prefix}?${qs}`, {agent, method: 'POST'})
        .then((response: tFetchResponse) => {
          if (!response.ok) throw response;
          return response.json();
        });

      console.log('result ? ', result);

      return dispatch(postDecisionSuccess(result));
    } catch (err) {
      console.log('error ? ', err);
      return dispatch(postDecisionFailure(err));
    }
  };
});
