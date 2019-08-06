import { memoize } from 'redux-memoize';
import { Dispatch } from 'redux';
import { agent } from '../../../utils';

import {
  getEventsBegin,
  getEventsSuccess,
  getEventsFailure,
} from './actions';

export const getEvents = memoize({ ttl: 300 },
  (id: number = 100, limit?: number, offset?: number) => {
    return async function <S>(dispatch: Dispatch<S>) {
      dispatch(getEventsBegin());

      const prefix = __DEV__ ?
        'https://127.0.0.1:3001/api/v1/eventsByOrg' :
        '/api/v1/eventsByOrg';

      try {
        const query = `?id=${id}`;
        const limitStr = limit ? `&limit=${limit}` : '';
        const offsetStr = offset ? `&offset=${offset}` : '';
        const qs = `${prefix}${query}${limitStr}${offsetStr}`;

        // @ts-ignore
        const result = await fetch(qs, { agent });
        const json = await result.json();
        return dispatch(getEventsSuccess(json));
      } catch (err) {
        return dispatch(getEventsFailure(err));
      }
    };
  });
