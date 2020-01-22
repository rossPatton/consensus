import {
  PATCH_USER_BY_ORG_BEGIN,
  PATCH_USER_BY_ORG_FAILURE,
  PATCH_USER_BY_ORG_SUCCESS,
  tBeginAction,
  tFailureAction,
  tSuccessAction,
} from './_types';

export const patchUserByOrgBegin = (): tBeginAction => ({
  type: PATCH_USER_BY_ORG_BEGIN,
});

export const patchUserByOrgSuccess = (payload: tUsersByOrg): tSuccessAction => ({
  type: PATCH_USER_BY_ORG_SUCCESS,
  payload,
});

export const patchUserByOrgFailure = (payload: Error): tFailureAction => ({
  type: PATCH_USER_BY_ORG_FAILURE,
  payload,
});
