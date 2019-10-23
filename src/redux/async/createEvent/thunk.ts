import { Dispatch } from 'redux';
import { memoize } from 'redux-memoize';

import { agent, objToQueryString } from '../../../utils';
import {
  createEventBegin,
  createEventFailure,
  createEventSuccess,
} from './actions';

const prefix = '/api/v1/event';

export const createEvent = memoize({ttl: 300}, (event: tEvent) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(createEventBegin());

    try {
      const qs = objToQueryString(event);
      const result = await fetch(`${prefix}?${qs}`, {
        // @ts-ignore
        agent,
        method: 'POST',
      })
        .then((response: tFetchResponse) => {
          if (!response.ok) throw response;
          return response.json();
        });

      return dispatch(createEventSuccess(result));
    } catch (err) {
      return dispatch(createEventFailure(err));
    }
  };
});
