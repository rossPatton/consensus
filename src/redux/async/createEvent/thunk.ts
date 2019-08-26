import { memoize } from 'redux-memoize';
import { Dispatch } from 'redux';
import { agent, objToQueryString } from '../../../utils';

import {
  createEventBegin,
  createEventSuccess,
  createEventFailure,
} from './actions';

export const createEvent = memoize({ ttl: 300 }, (event: tPublicEvent) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(createEventBegin());

    try {
      const prefix = __DEV__ ?
        'https://127.0.0.1:3001/api/v1/event' :
        '/api/v1/event';

      const qs = objToQueryString(event);

      const result = await fetch(`${prefix}?${qs}&client=true`, {
        // @ts-ignore
        agent,
        method: 'POST',
      })
        .then((response: any) => {
          if (!response.ok) throw response;
          return response.json();
        });

      return dispatch(createEventSuccess(result));
    } catch (err) {
      return dispatch(createEventFailure(err));
    }
  };
});
