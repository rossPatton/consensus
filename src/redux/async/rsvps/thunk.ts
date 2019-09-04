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

export const getRsvps = memoize({ttl: 300}, () => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(getRsvpBegin());

    try {
      const prefix = `${__URL__}/api/v1/rsvps`;

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
      const prefix = `${__URL__}/api/v1/rsvp`;
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
