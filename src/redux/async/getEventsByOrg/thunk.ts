import { memoize } from 'redux-memoize';
import { Dispatch } from 'redux';
import { agent, objToQueryString } from '../../../utils';

import {
  getEventsByOrgBegin,
  getEventsByOrgSuccess,
  getEventsByOrgFailure,
} from './actions';

export const getEventsByOrg = memoize({ ttl: 300 }, (queryObj: tIdQuery) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(getEventsByOrgBegin());

    try {
      const prefix = `${__URL__}/api/v1/eventsByOrg`;
      const qs = objToQueryString(queryObj);

      // @ts-ignore
      const result = await fetch(`${prefix}?${qs}`, {agent})
        .then((response: tFetchResponse) => {
          if (!response.ok) throw response;
          return response.json();
        });

      return dispatch(getEventsByOrgSuccess(result));
    } catch (err) {
      return dispatch(getEventsByOrgFailure(err));
    }
  };
});
