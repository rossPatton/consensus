import { memoize } from 'redux-memoize';
import { Dispatch } from 'redux';
import { agent } from '../../../utils';

import {
  getEventByIdBegin,
  getEventByIdSuccess,
  getEventByIdFailure,
} from './actions';

export const getEventById = memoize({ ttl: 300 }, (queryObj: tIdQuery) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(getEventByIdBegin());

    const prefix = __DEV__ ?
      'https://127.0.0.1:3001/api/v1/event' :
      '/api/v1/event';

    try {
      const { id, limit, offset } = queryObj;

      const query = `?id=${id}`;
      const limitStr = limit ? `&limit=${limit}` : '';
      const offsetStr = offset ? `&offset=${offset}` : '';
      const qs = `${prefix}${query}${limitStr}${offsetStr}`;

      // @ts-ignore
      const result = await fetch(qs, { agent });
      const json = await result.json();
      return dispatch(getEventByIdSuccess(json));
    } catch (err) {
      return dispatch(getEventByIdFailure(err));
    }
  };
});
