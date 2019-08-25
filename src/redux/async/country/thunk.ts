import { memoize } from 'redux-memoize';
import { Dispatch } from 'redux';
import { agent, objToQueryString } from '../../../utils';

import {
  getCountryBegin,
  getCountrySuccess,
  getCountryFailure,
} from './actions';

export const getCountry = memoize({ttl: 300}, (params: any) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(getCountryBegin());

    const prefix = __DEV__ ?
      'https://127.0.0.1:3001/api/v1/country' :
      '/api/v1/country';

    try {
      const qs = objToQueryString(params);

      // @ts-ignore
      const result = await fetch(`${prefix}?${qs}`, { agent })
        .then((response: any) => {
          if (!response.ok) throw response;
          return response.json();
        });

      return dispatch(getCountrySuccess(result));
    } catch (err) {
      return dispatch(getCountryFailure(err));
    }
  };
});
