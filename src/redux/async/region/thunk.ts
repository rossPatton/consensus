import { memoize } from 'redux-memoize';
import { Dispatch } from 'redux';
import { agent, objToQueryString } from '../../../utils';

import {
  getRegionBegin,
  getRegionSuccess,
  getRegionFailure,
} from './actions';

export const getRegion = memoize({ttl: 300}, (params: any) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(getRegionBegin());

    const prefix = __DEV__ ?
      'https://127.0.0.1:3001/api/v1/region' :
      '/api/v1/region';

    try {
      const qs = objToQueryString(params);

      // @ts-ignore
      const result = await fetch(`${prefix}?${qs}`, { agent })
        .then((response: any) => {
          if (!response.ok) throw response;
          return response.json();
        });

      return dispatch(getRegionSuccess(result));
    } catch (err) {
      return dispatch(getRegionFailure(err));
    }
  };
});
