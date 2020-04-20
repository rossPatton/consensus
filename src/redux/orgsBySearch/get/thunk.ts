import qs from 'query-string';

import { api } from '~app/utils';

import { path } from '../_constants';
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
