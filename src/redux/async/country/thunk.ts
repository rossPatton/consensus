import { memoize } from 'redux-memoize';
import { Dispatch } from 'redux';
import { agent, objToQueryString } from '../../../utils';

import {
  getCountryBegin,
  getCountrySuccess,
  getCountryFailure,
} from './actions';

export const getCountry = memoize({ttl: 300}, (params: tLocationParams) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(getCountryBegin());

    try {
      const prefix = `${__URL__}/api/v1/country`;
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
