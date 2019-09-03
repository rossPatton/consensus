import { Dispatch } from 'redux';
import { memoize } from 'redux-memoize';

import { agent } from '../../../utils';
import {
  getOrgsByUserBegin,
  getOrgsByUserFailure,
  getOrgsByUserSuccess,
} from './actions';

export const getOrgsByUser = memoize({ttl: 300}, () => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(getOrgsByUserBegin());

    try {
      // @ts-ignore
      const result = await fetch(`${__URL__}/api/v1/orgsByUser`, {agent})
        .then((response: tFetchResponse) => {
          if (!response.ok) throw response;
          return response.json();
        });

      return dispatch(getOrgsByUserSuccess(result));
    } catch (err) {
      return dispatch(getOrgsByUserFailure(err));
    }
  };
});
