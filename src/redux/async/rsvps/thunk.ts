import { Dispatch } from 'redux';
import { memoize } from 'redux-memoize';

import { agent, objToQueryString } from '../../../utils';
import {
  getRsvpBegin,
  getRsvpFailure,
  getRsvpSuccess,
  setRsvpBegin,
  setRsvpFailure,
  setRsvpSuccess,
} from './actions';

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

export const setRsvp = (query: any) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(setRsvpBegin());

    try {
      const endpoint = '/api/v1/rsvp';
      const prefix = __CLIENT__ ? endpoint : `${__URL__}${endpoint}`;
      const qs = objToQueryString(query);

      // @ts-ignore
      const result = await fetch(`${prefix}?${qs}`, {agent, method: 'POST'})
        .then((response: tFetchResponse) => {
          if (!response.ok) throw response;
          return response.json();
        });

      return dispatch(setRsvpSuccess(result));
    } catch (err) {
      return dispatch(setRsvpFailure(err));
    }
  };
};
