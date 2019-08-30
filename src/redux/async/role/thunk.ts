import { Dispatch } from 'redux';
import { memoize } from 'redux-memoize';

import { agent, objToQueryString } from '../../../utils';
import {getRoleBegin, getRoleFailure, getRoleSuccess} from './actions';

const prefix = `${__URL__}/api/v1/role`;

export const getRole = memoize({ttl: 300}, (query: any) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(getRoleBegin());

    try {
      const qs = objToQueryString(query);

      // @ts-ignore
      const result = await fetch(`${prefix}?${qs}`, {agent})
        .then((response: tFetchResponse) => {
          if (!response.ok) throw response;
          return response.json();
        });

      console.log('user role => ', result);

      return dispatch(getRoleSuccess(result));
    } catch (err) {
      return dispatch(getRoleFailure(err));
    }
  };
});
