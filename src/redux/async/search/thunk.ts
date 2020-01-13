import {Dispatch} from 'redux';
import {memoize} from 'redux-memoize';

import {agent, objToQueryString} from '../../../utils';
import {
  getOrgsBySearchBegin,
  getOrgsBySearchFailure,
  getOrgsBySearchSuccess,
} from './actions';

const endpoint = '/api/v1/search';
const prefix = __CLIENT__ ? endpoint : `${__URL__}${endpoint}`;

export const getOrgsBySearch = memoize({ttl: 300}, (query: tIdQuery) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(getOrgsBySearchBegin());

    try {
      const qs = objToQueryString(query);

      // @ts-ignore
      const result = await fetch(`${prefix}?${qs}`, {agent})
        .then((response: tFetchResponse) => {
          if (!response.ok) throw response;
          return response.json();
        });

      return dispatch(getOrgsBySearchSuccess(result));
    } catch (err) {
      return dispatch(getOrgsBySearchFailure(err));
    }
  };
});
