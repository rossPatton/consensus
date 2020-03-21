import qs from 'query-string';

import { path } from '../_constants';
import { api } from '../../../utils';
import { getGroupsBySearchFailure, getGroupsBySearchSuccess } from './actions';

export const getGroupsBySearch = (query: qs.ParsedQuery) => {
  return async function (dispatch: Function) {
    return api({
      dispatch,
      failure: getGroupsBySearchFailure,
      query,
      path,
      success: getGroupsBySearchSuccess,
    });
  };
};
