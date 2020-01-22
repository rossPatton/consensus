

import { api } from '../../../../utils';
import {
  setRsvpBegin,
  setRsvpFailure,
  setRsvpSuccess,
} from './actions';

const endpoint = '/api/v1/rsvp';
const path = __CLIENT__ ? endpoint : `${__URL__}${endpoint}`;

export const setRsvp = (query: tRSVPQuery) => {
  return async function (dispatch: Function) {
    dispatch(setRsvpBegin());

    try {
      const result = await api({method: 'POST', query, path});
      return dispatch(setRsvpSuccess(result));
    } catch (err) {
      return dispatch(setRsvpFailure(err));
    }
  };
};
