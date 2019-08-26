import { memoize } from 'redux-memoize';
import { Dispatch } from 'redux';
import { agent, objToQueryString } from '../../../utils';

import {
  getCityBegin,
  getCitySuccess,
  getCityFailure,
} from './actions';

export const getCity = memoize({ttl: 300}, (params: tLocationParams) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(getCityBegin());

    try {
      const prefix = `${__URL__}/api/v1/city`;
      const qs = objToQueryString(params);

      // @ts-ignore
      const result = await fetch(`${prefix}?${qs}`, {agent})
        .then((response: tFetchResponse) => {
          if (!response.ok) throw response;
          return response.json();
        });

      return dispatch(getCitySuccess(result));
    } catch (err) {
      return dispatch(getCityFailure(err));
    }
  };
});
