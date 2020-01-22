import {
  POST_USER_TO_ORG_BEGIN,
  POST_USER_TO_ORG_FAILURE,
  POST_USER_TO_ORG_SUCCESS,
  tBeginAction,
  tFailureAction,
  tSuccessAction,
} from './_types';

export const postUserToOrgBegin = (): tBeginAction => ({
  type: POST_USER_TO_ORG_BEGIN,
});

export const postUserToOrgSuccess = (payload: tUsersByOrg): tSuccessAction => ({
  type: POST_USER_TO_ORG_SUCCESS,
  payload,
});

export const postUserToOrgFailure = (payload: Error): tFailureAction => ({
  type: POST_USER_TO_ORG_FAILURE,
  payload,
});
