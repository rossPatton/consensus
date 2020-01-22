import {
  DELETE_USER_FROM_ORG_BEGIN,
  DELETE_USER_FROM_ORG_FAILURE,
  DELETE_USER_FROM_ORG_SUCCESS,
  tBeginAction,
  tFailureAction,
  tSuccessAction,
} from './_types';

export const deleteUserFromOrgBegin = (): tBeginAction => ({
  type: DELETE_USER_FROM_ORG_BEGIN,
});

export const deleteUserFromOrgSuccess = (payload: tUsersByOrg): tSuccessAction => ({
  type: DELETE_USER_FROM_ORG_SUCCESS,
  payload,
});

export const deleteUserFromOrgFailure = (payload: Error): tFailureAction => ({
  type: DELETE_USER_FROM_ORG_FAILURE,
  payload,
});
