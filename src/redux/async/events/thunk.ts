import {Dispatch} from 'redux';
import {memoize} from 'redux-memoize';

import {agent, objToQueryString} from '../../../utils';
import {
  deleteEventBegin,
  deleteEventFailure,
  deleteEventSuccess,
  getEventsBegin,
  getEventsFailure,
  getEventsSuccess,
} from './actions';

const endpoint = '/api/v1/events';
const prefix = __CLIENT__ ? endpoint : `${__URL__}${endpoint}`;

export const getEvents = memoize({ttl: 300}, (query: tIdQuery) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(getEventsBegin());

    try {
      const qs = objToQueryString(query);

      // @ts-ignore
      const result = await fetch(`${prefix}?${qs}`, {agent})
        .then((response: tFetchResponse) => {
          if (!response.ok) throw response;
          return response.json();
        });

      return dispatch(getEventsSuccess(result));
    } catch (err) {
      return dispatch(getEventsFailure(err));
    }
  };
});

export const getEventsByUser = memoize({ttl: 300}, (query: tIdQuery) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(getEventsBegin());

    try {
      const endpoint = '/api/v1/eventsByUser';
      const prefix = __CLIENT__ ? endpoint : `${__URL__}${endpoint}`;
      const qs = objToQueryString(query);

      // @ts-ignore
      const result = await fetch(`${prefix}?${qs}`, {agent})
        .then((response: tFetchResponse) => {
          if (!response.ok) throw response;
          return response.json();
        });

      return dispatch(getEventsSuccess(result));
    } catch (err) {
      return dispatch(getEventsFailure(err));
    }
  };
});

export const deleteEvent = memoize({ttl: 300}, (query: tIdQuery) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(deleteEventBegin());

    try {
      const qs = objToQueryString(query);

      // @ts-ignore
      const result = await fetch(`${prefix}?${qs}`, {agent, method: 'DELETE'})
        .then((response: tFetchResponse) => {
          if (!response.ok) throw response;
          return response.json();
        });

      return dispatch(deleteEventSuccess(result));
    } catch (err) {
      return dispatch(deleteEventFailure(err));
    }
  };
});
