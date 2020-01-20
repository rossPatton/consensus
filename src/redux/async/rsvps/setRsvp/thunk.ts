import { Dispatch } from 'redux';

import { agent, objToQueryString } from '../../../../utils';
import {
  setRsvpBegin,
  setRsvpFailure,
  setRsvpSuccess,
} from './actions';

const endpoint = '/api/v1/rsvp';
const prefix = __CLIENT__ ? endpoint : `${__URL__}${endpoint}`;

export const setRsvp = (query: tRSVPQuery) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(setRsvpBegin());

    try {
      const qs = objToQueryString(query);

      // @ts-ignore
      const result: tRSVP = await fetch(`${prefix}?${qs}`, {agent, method: 'POST'})
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
