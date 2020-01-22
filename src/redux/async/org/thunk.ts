

import { api } from '../../../utils';
import {
  getOrgBegin,
  getOrgFailure,
  getOrgSuccess,
  patchOrgBegin,
  patchOrgFailure,
  patchOrgSuccess,
} from './actions';

const endpoint = '/api/v1/org';
const path = __CLIENT__ ? endpoint : `${__URL__}${endpoint}`;

export const getOrg = (query: tOrgRouteParams) => {
  return async function (dispatch: Function) {
    dispatch(getOrgBegin());

    try {
      const result = await api({query, path});
      return dispatch(getOrgSuccess(result));
    } catch (err) {
      return dispatch(getOrgFailure(err));
    }
  };
};

export const patchOrg = (query: tPatchOrgQuery) => {
  return async function (dispatch: Function) {
    dispatch(patchOrgBegin());

    try {
      const result = await api({method: 'PATCH', query, path});
      return dispatch(patchOrgSuccess(result));
    } catch (err) {
      return dispatch(patchOrgFailure(err));
    }
  };
};

export const postOrg = (query: tOrgRouteParams) => {
  return async function (dispatch: Function) {
    dispatch(patchOrgBegin());

    try {
      const result = await api({method: 'POST', query, path});
      return dispatch(patchOrgSuccess(result));
    } catch (err) {
      return dispatch(patchOrgFailure(err));
    }
  };
};
