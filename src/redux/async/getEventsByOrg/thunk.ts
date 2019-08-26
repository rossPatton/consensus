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

    const prefix = __DEV__ ?
      'https://127.0.0.1:3001/api/v1/eventsByOrg' :
      '/api/v1/eventsByOrg';

    try {
      const qs = objToQueryString(queryObj as any);

      // @ts-ignore
      const result = await fetch(`${prefix}?${qs}`, {agent})
        .then((response: any) => {
          if (!response.ok) throw response;
          return response.json();
        });

      return dispatch(getEventsByOrgSuccess(result));
    } catch (err) {
      return dispatch(getEventsByOrgFailure(err));
    }
  };
});
