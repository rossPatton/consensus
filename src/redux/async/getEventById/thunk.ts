

import { api } from '../../../utils';
import {
  getEventByIdBegin,
  getEventByIdFailure,
  getEventByIdSuccess,
} from './actions';

const endpoint = '/api/v1/event';
const path = __CLIENT__ ? endpoint : `${__URL__}${endpoint}`;

export const getEventById = (query: tIdQueryC) => {
  return async function (dispatch: Function) {
    dispatch(getEventByIdBegin());

    try {
      const result = await api({query, path});
      return dispatch(getEventByIdSuccess(result));
    } catch (err) {
      return dispatch(getEventByIdFailure(err));
    }
  };
};
