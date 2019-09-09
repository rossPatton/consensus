import {
  DELETE_ORG_BY_USER_BEGIN,
  DELETE_ORG_BY_USER_FAILURE,
  DELETE_ORG_BY_USER_SUCCESS,
  GET_ORGS_BY_USER_BEGIN,
  GET_ORGS_BY_USER_FAILURE,
  GET_ORGS_BY_USER_SUCCESS,
  tBeginAction,
  tFailureAction,
  tSuccessAction,
} from './_types';

export const deleteOrgByUserBegin = (): tBeginAction => ({
  type: DELETE_ORG_BY_USER_BEGIN,
});

export const deleteOrgByUserSuccess = (payload: tThunk<tOrg>): tSuccessAction => ({
  type: DELETE_ORG_BY_USER_SUCCESS,
  payload,
});

export const deleteOrgByUserFailure = (payload: Error): tFailureAction => ({
  type: DELETE_ORG_BY_USER_FAILURE,
  payload,
});

export const getOrgsByUserBegin = (): tBeginAction => ({
  type: GET_ORGS_BY_USER_BEGIN,
});

export const getOrgsByUserSuccess = (payload: tThunk<tOrg>): tSuccessAction => ({
  type: GET_ORGS_BY_USER_SUCCESS,
  payload,
});

export const getOrgsByUserFailure = (payload: Error): tFailureAction => ({
  type: GET_ORGS_BY_USER_FAILURE,
  payload,
});
