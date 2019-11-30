import { Dispatch } from 'redux';
import { memoize } from 'redux-memoize';

import { agent, objToQueryString } from '../../../utils';
import {
  getRegionBegin,
  getRegionFailure,
  getRegionSuccess,
} from './actions';

const endpoint = '/api/v1/region';
const prefix = __CLIENT__ ? endpoint : `${__URL__}${endpoint}`;

export const getRegion = memoize({ttl: 300}, (params: tDirectoryParams) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(getRegionBegin());

    try {
      const qs = objToQueryString(params);

      // @ts-ignore
      const result = await fetch(`${prefix}?${qs}`, { agent })
        .then((response: tFetchResponse) => {
          if (!response.ok) throw response;
          return response.json();
        });

      return dispatch(getRegionSuccess(result));
    } catch (err) {
      return dispatch(getRegionFailure(err));
    }
  };
});
