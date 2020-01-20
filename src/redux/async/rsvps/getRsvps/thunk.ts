import { Dispatch } from 'redux';
import { memoize } from 'redux-memoize';

import { agent } from '../../../../utils';
import { getRsvpBegin, getRsvpFailure, getRsvpSuccess } from './actions';

const endpoint = '/api/v1/rsvps';
const prefix = __CLIENT__ ? endpoint : `${__URL__}${endpoint}`;

export const getRsvps = memoize({ttl: 300}, () => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(getRsvpBegin());

    try {
      // @ts-ignore
      const result = await fetch(prefix, {agent})
        .then((response: tFetchResponse) => {
          if (!response.ok) throw response;
          return response.json();
        });

      return dispatch(getRsvpSuccess(result));
    } catch (err) {
      return dispatch(getRsvpFailure(err));
    }
  };
});
