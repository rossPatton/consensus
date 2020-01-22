

import { api } from '../../../../utils';
import { getRsvpBegin, getRsvpFailure, getRsvpSuccess } from './actions';

const endpoint = '/api/v1/rsvps';
const path = __CLIENT__ ? endpoint : `${__URL__}${endpoint}`;

export const getRsvps = () => {
  return async function (dispatch: Function) {
    dispatch(getRsvpBegin());

    try {
      const result = await api({path});
      return dispatch(getRsvpSuccess(result));
    } catch (err) {
      return dispatch(getRsvpFailure(err));
    }
  };
};
