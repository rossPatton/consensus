import {
  GET_ORG_BEGIN,
  GET_ORG_FAILURE,
  GET_ORG_SUCCESS,
  PATCH_ORG_BEGIN,
  PATCH_ORG_FAILURE,
  PATCH_ORG_SUCCESS,
  POST_ORG_BEGIN,
  POST_ORG_FAILURE,
  POST_ORG_SUCCESS,
  tBeginAction,
  tFailureAction,
  tSuccessAction,
} from './_types';

export const getOrgBegin = (): tBeginAction => ({
  type: GET_ORG_BEGIN,
});

export const getOrgSuccess = (payload: tThunk<tOrg>): tSuccessAction => ({
  type: GET_ORG_SUCCESS,
  payload,
});

export const getOrgFailure = (payload: Error): tFailureAction => ({
  type: GET_ORG_FAILURE,
  payload,
});

export const patchOrgBegin = (): tBeginAction => ({
  type: PATCH_ORG_BEGIN,
});

export const patchOrgSuccess = (payload: tThunk<tOrg>): tSuccessAction => ({
  type: PATCH_ORG_SUCCESS,
  payload,
});

export const patchOrgFailure = (payload: Error): tFailureAction => ({
  type: PATCH_ORG_FAILURE,
  payload,
});

export const postOrgBegin = (): tBeginAction => ({
  type: POST_ORG_BEGIN,
});

export const postOrgSuccess = (payload: tThunk<tOrg>): tSuccessAction => ({
  type: POST_ORG_SUCCESS,
  payload,
});

export const postOrgFailure = (payload: Error): tFailureAction => ({
  type: POST_ORG_FAILURE,
  payload,
});
