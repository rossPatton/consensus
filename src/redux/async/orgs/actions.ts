import {
  GET_ORGS_BY_USER_BEGIN,
  GET_ORGS_BY_USER_FAILURE,
  GET_ORGS_BY_USER_SUCCESS,
  tBeginAction,
  tFailureAction,
  tSuccessAction,
} from './_types';

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
