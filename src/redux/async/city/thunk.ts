import { memoize } from 'redux-memoize';
import { Dispatch } from 'redux';
import { agent, objToQueryString } from '../../../utils';

import {
  getCityBegin,
  getCitySuccess,
  getCityFailure,
} from './actions';

export const getCity = memoize({ttl: 300}, (params: any) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(getCityBegin());

    const prefix = __DEV__ ?
      'https://127.0.0.1:3001/api/v1/city' :
      '/api/v1/city';

    try {
      const qs = objToQueryString(params);

      // @ts-ignore
      const result = await fetch(`${prefix}?${qs}`, {agent})
        .then((response: any) => {
          if (!response.ok) throw response;
          return response.json();
        });

      return dispatch(getCitySuccess(result));
    } catch (err) {
      return dispatch(getCityFailure(err));
    }
  };
});
