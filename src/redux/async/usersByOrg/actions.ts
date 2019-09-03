import {
  GET_USERS_BY_ORG_BEGIN,
  GET_USERS_BY_ORG_FAILURE,
  GET_USERS_BY_ORG_SUCCESS,
  POST_USER_BY_ORG_BEGIN,
  POST_USER_BY_ORG_FAILURE,
  POST_USER_BY_ORG_SUCCESS,
  SET_USER_BY_ORG,
  tBeginAction,
  tFailureAction,
  tSuccessAction,
} from './_types';

export const getUsersByOrgBegin = (): tBeginAction => ({
  type: GET_USERS_BY_ORG_BEGIN,
});

export const getUsersByOrgSuccess =
(payload: tThunk<tUsersByOrg>): tSuccessAction => ({
  type: GET_USERS_BY_ORG_SUCCESS,
  payload,
});

export const getUsersByOrgFailure = (payload: Error): tFailureAction => ({
  type: GET_USERS_BY_ORG_FAILURE,
  payload,
});

export const postUserByOrgBegin = (): tBeginAction => ({
  type: POST_USER_BY_ORG_BEGIN,
});

export const postUserByOrgSuccess =
(payload: tThunk<tUsersByOrg>): tSuccessAction => ({
  type: POST_USER_BY_ORG_SUCCESS,
  payload,
});

export const postUserByOrgFailure = (payload: Error): tFailureAction => ({
  type: POST_USER_BY_ORG_FAILURE,
  payload,
});

// update redux state after posting or updating user/org relation
export const setUserByOrg = (payload: any): tSuccessAction => ({
  type: SET_USER_BY_ORG,
  payload,
});
