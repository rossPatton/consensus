import { Dispatch } from 'redux';
import { memoize } from 'redux-memoize';

import {agent, objToQueryString} from '../../../utils';
import {getRolesBegin, getRolesFailure, getRolesSuccess} from './actions';

const prefix = '/api/v1/roles';

export const getRoles = memoize({ttl: 300}, (query: any) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(getRolesBegin());

    try {
      const qs = objToQueryString(query);

      // @ts-ignore
      const result = await fetch(`${prefix}?${qs}`, {agent})
        .then((response: tFetchResponse) => {
          if (!response.ok) throw response;
          return response.json();
        });

      return dispatch(getRolesSuccess(result));
    } catch (err) {
      return dispatch(getRolesFailure(err));
    }
  };
});
