import { Dispatch } from 'redux';
import { memoize } from 'redux-memoize';

import { agent, objToQueryString } from '../../../utils';
import {
  getCountryBegin,
  getCountryFailure,
  getCountrySuccess,
} from './actions';

const endpoint = '/api/v1/country';
const prefix = __CLIENT__ ? endpoint : `${__URL__}${endpoint}`;

export const getCountry = memoize({ttl: 300}, (params: tDirectoryParams) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(getCountryBegin());

    try {
      const qs = objToQueryString(params);

      // @ts-ignore
      const result = await fetch(`${prefix}?${qs}`, {agent})
        .then((response: tFetchResponse) => {
          if (!response.ok) throw response;
          return response.json();
        });

      return dispatch(getCountrySuccess(result));
    } catch (err) {
      return dispatch(getCountryFailure(err));
    }
  };
});
