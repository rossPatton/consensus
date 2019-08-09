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

      // @ts-ignore
      const result = await fetch(`${prefix}?${qs}`, {
        // @ts-ignore
        agent,
        method: 'POST',
      });
      const json = await result.json();
      return dispatch(createEventSuccess(json));
    } catch (err) {
      return dispatch(createEventFailure(err));
    }
  };
});
