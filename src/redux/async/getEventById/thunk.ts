import { memoize } from 'redux-memoize';
import { Dispatch } from 'redux';
import { agent, objToQueryString } from '../../../utils';

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
      const qs = objToQueryString(queryObj as any);

      // @ts-ignore
      const result = await fetch(`${prefix}?${qs}`, {agent})
        .then((response: any) => {
          if (!response.ok) throw response;
          return response.json();
        });

      return dispatch(getEventByIdSuccess(result));
    } catch (err) {
      return dispatch(getEventByIdFailure(err));
    }
  };
});
