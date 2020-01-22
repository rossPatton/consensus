

import {api} from '../../../utils';
import {
  getCityBegin,
  getCityFailure,
  getCitySuccess,
} from './actions';

const endpoint = '/api/v1/city';
const path = __CLIENT__ ? endpoint : `${__URL__}${endpoint}`;

export const getCity = (query: tDirectoryParams) => {
  return async function (dispatch: Function) {
    dispatch(getCityBegin());

    try {
      const result = await api({query, path});
      return dispatch(getCitySuccess(result));
    } catch (err) {
      return dispatch(getCityFailure(err));
    }
  };
};
