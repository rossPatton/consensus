import { Dispatch } from 'redux';
import { memoize } from 'redux-memoize';

import { agent, objToQueryString } from '../../../utils';
import {
  getEventByIdBegin,
  getEventByIdFailure,
  getEventByIdSuccess,
} from './actions';

export const getEventById = memoize({ ttl: 300 }, (queryObj: tIdQuery) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(getEventByIdBegin());

    try {
      const prefix = '/api/v1/event';
      const qs = objToQueryString(queryObj);

      // @ts-ignore
      const result = await fetch(`${prefix}?${qs}`, {agent})
        .then((response: tFetchResponse) => {
          if (!response.ok) throw response;
          return response.json();
        });

      return dispatch(getEventByIdSuccess(result));
    } catch (err) {
      return dispatch(getEventByIdFailure(err));
    }
  };
});
