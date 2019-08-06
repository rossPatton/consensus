import {
  GET_USERS_BY_ORG_BEGIN,
  GET_USERS_BY_ORG_SUCCESS,
  GET_USERS_BY_ORG_FAILURE,
  tBeginAction,
  tSuccessAction,
  tFailureAction,
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
