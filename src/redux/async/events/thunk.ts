import { Dispatch } from 'redux';
import { memoize } from 'redux-memoize';

import { agent, objToQueryString } from '../../../utils';
import {
  getEventsBegin,
  getEventsFailure,
  getEventsSuccess,
} from './actions';

const prefix = `${__URL__}/api/v1/events`;

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
