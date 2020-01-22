import qs from 'querystring';

import { api } from '../../../utils';
import {
  getOrgsBySearchBegin,
  getOrgsBySearchFailure,
  getOrgsBySearchSuccess,
} from './actions';
const endpoint = '/api/v1/search';
const path = __CLIENT__ ? endpoint : `${__URL__}${endpoint}`;

export const getOrgsBySearch = (query: qs.ParsedUrlQuery) => {
  return async function (dispatch: Function) {
    dispatch(getOrgsBySearchBegin());

    try {
      const result = await api({query, path});
      return dispatch(getOrgsBySearchSuccess(result));
    } catch (err) {
      return dispatch(getOrgsBySearchFailure(err));
    }
  };
};
