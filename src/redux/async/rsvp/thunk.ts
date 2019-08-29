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

const prefix = `${__URL__}/api/v1/rsvp`;

export const getRsvp = memoize({ttl: 300}, (query: any) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(getRsvpBegin());

    try {
      const qs = objToQueryString(query);

      // @ts-ignore
      const result = await fetch(`${prefix}?${qs}`, {agent})
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

export const setRsvp = memoize({ttl: 300}, (query: any) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(setRsvpBegin());

    try {
      const qs = objToQueryString(query);
      console.log('`${prefix}?${qs}` => ', `${prefix}?${qs}`);

      const result = await fetch(`${prefix}?${qs}`, {
        // @ts-ignore
        agent,
        method: 'POST',
      })
        .then((response: tFetchResponse) => {
          console.log('ok ? ', response.ok);
          if (!response.ok) throw response;
          return response.json();
        });

      console.log('rsvp result => ', result);

      return dispatch(setRsvpSuccess(result));
    } catch (err) {
      return dispatch(setRsvpFailure(err));
    }
  };
});
