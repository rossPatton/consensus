

import {api} from '../../../utils';
import {
  getCountryBegin,
  getCountryFailure,
  getCountrySuccess,
} from './actions';

const endpoint = '/api/v1/country';
const path = __CLIENT__ ? endpoint : `${__URL__}${endpoint}`;

export const getCountry = (query: tDirectoryParams) => {
  return async function (dispatch: Function) {
    dispatch(getCountryBegin());

    try {
      const result = await api({query, path});
      return dispatch(getCountrySuccess(result));
    } catch (err) {
      return dispatch(getCountryFailure(err));
    }
  };
};
