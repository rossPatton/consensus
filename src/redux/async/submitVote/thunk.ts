import { Dispatch } from 'redux';
import { memoize } from 'redux-memoize';

import { agent, objToQueryString } from '../../../utils';
import { submitVoteBegin, submitVoteFailure, submitVoteSuccess } from './actions';

const endpoint = '/api/v1/userDecisions';
const prefix = __CLIENT__ ? endpoint : `${__URL__}${endpoint}`;

export const submitVote = memoize({ ttl: 300 }, (user: tUser) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(submitVoteBegin());

    try {
      const qs = objToQueryString(user);

      // we do it this way so errors can bubble properly to our middleware
      const result = await fetch(`${prefix}?${qs}`, {
        // @ts-ignore
        agent,
        // we need credentials here so that the session cookie gets set properly
        credentials: __DEV__ ? 'include' : 'same-origin',
        method: 'POST',
      })
        .then((response: tFetchResponse) => {
          if (!response.ok) throw response;
          return response.json();
        });

      return dispatch(submitVoteSuccess(result));
    } catch (err) {
      return dispatch(submitVoteFailure(err));
    }
  };
});
