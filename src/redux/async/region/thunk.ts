

import { api } from '../../../utils';
import {
  getRegionBegin,
  getRegionFailure,
  getRegionSuccess,
} from './actions';

const endpoint = '/api/v1/region';
const path = __CLIENT__ ? endpoint : `${__URL__}${endpoint}`;

export const getRegion = (query: tDirectoryParams) => {
  return async function (dispatch: Function) {
    dispatch(getRegionBegin());

    try {
      const result = await api({query, path});
      return dispatch(getRegionSuccess(result));
    } catch (err) {
      return dispatch(getRegionFailure(err));
    }
  };
};
