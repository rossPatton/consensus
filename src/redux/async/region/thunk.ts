import { memoize } from 'redux-memoize';
import { Dispatch } from 'redux';
import { agent, objToQueryString } from '../../../utils';

import {
  getRegionBegin,
  getRegionSuccess,
  getRegionFailure,
} from './actions';

export const getRegion = memoize({ttl: 300}, (params: tLocationParams) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(getRegionBegin());

    try {
      const prefix = `${__URL__}/api/v1/region`;
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
