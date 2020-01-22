

import { api } from '../../../utils';
import {
  deleteOrgByUserBegin,
  deleteOrgByUserFailure,
  deleteOrgByUserSuccess,
  getOrgsBegin,
  getOrgsByUserBegin,
  getOrgsByUserFailure,
  getOrgsByUserSuccess,
  getOrgsFailure,
  getOrgsSuccess,
} from './actions';

export const getOrgs = (query: any) => {
  return async function (dispatch: Function) {
    dispatch(getOrgsBegin());

    try {
      const endpoint = '/api/v1/orgs';
      const path = __CLIENT__ ? endpoint : `${__URL__}${endpoint}`;
      const result = await api({query, path});
      return dispatch(getOrgsSuccess(result));
    } catch (err) {
      return dispatch(getOrgsFailure(err));
    }
  };
};

export const getOrgsBySession = () => {
  return async function (dispatch: Function) {
    dispatch(getOrgsByUserBegin());

    try {
      const endpoint = '/api/v1/orgsBySession';
      const path = __CLIENT__ ? endpoint : `${__URL__}${endpoint}`;
      const result = await api({path});
      return dispatch(getOrgsByUserSuccess(result));
    } catch (err) {
      return dispatch(getOrgsByUserFailure(err));
    }
  };
};

const endpoint = '/api/v1/orgsByUser';
const path = __CLIENT__ ? endpoint : `${__URL__}${endpoint}`;

export const getOrgsByUser = (query: tIdQueryC) => {
  return async function (dispatch: Function) {
    dispatch(getOrgsByUserBegin());

    try {
      const result = await api({query, path});
      return dispatch(getOrgsByUserSuccess(result));
    } catch (err) {
      return dispatch(getOrgsByUserFailure(err));
    }
  };
};

export const leaveOrg = (query: {orgId: number}) => {
  return async function (dispatch: Function) {
    dispatch(deleteOrgByUserBegin());

    try {
      const result = await api({method: 'DELETE', query, path});
      return dispatch(deleteOrgByUserSuccess(result));
    } catch (err) {
      return dispatch(deleteOrgByUserFailure(err));
    }
  };
};
