

import { api } from '../../../utils';
import {
  deleteEventBegin,
  deleteEventFailure,
  deleteEventSuccess,
  getEventsBegin,
  getEventsFailure,
  getEventsSuccess,
} from './actions';

export const getEvents = (query: tIdQueryC) => {
  return async function (dispatch: Function) {
    dispatch(getEventsBegin());

    try {
      const endpoint = '/api/v1/events';
      const path = __CLIENT__ ? endpoint : `${__URL__}${endpoint}`;
      const result = await api({query, path});
      return dispatch(getEventsSuccess(result));
    } catch (err) {
      return dispatch(getEventsFailure(err));
    }
  };
};

export const getEventsByUser = () => {
  return async function (dispatch: Function) {
    dispatch(getEventsBegin());

    try {
      const endpoint = '/api/v1/eventsByUser';
      const path = __CLIENT__ ? endpoint : `${__URL__}${endpoint}`;
      const result = await api({path});
      return dispatch(getEventsSuccess(result));
    } catch (err) {
      return dispatch(getEventsFailure(err));
    }
  };
};

export const deleteEvent = (query: tIdQueryC) => {
  return async function (dispatch: Function) {
    dispatch(deleteEventBegin());

    try {
      const endpoint = '/api/v1/events';
      const path = __CLIENT__ ? endpoint : `${__URL__}${endpoint}`;
      const result = await api({method: 'DELETE', query, path});
      return dispatch(deleteEventSuccess(result));
    } catch (err) {
      return dispatch(deleteEventFailure(err));
    }
  };
};
