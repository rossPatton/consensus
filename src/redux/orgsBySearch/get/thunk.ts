import qs from 'query-string';

import { path } from '../_constants';
import { api } from '../../../utils';
import { getOrgsBySearchFailure, getOrgsBySearchSuccess } from './actions';

export const getOrgsBySearch = (query: qs.ParsedQuery) => {
  return async function (dispatch: Function) {
    return api({
      dispatch,
      failure: getOrgsBySearchFailure,
      query,
      path,
      success: getOrgsBySearchSuccess,
    });
  };
};
