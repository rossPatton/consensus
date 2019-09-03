import {
  GET_ORG_BEGIN,
  GET_ORG_FAILURE,
  GET_ORG_SUCCESS,
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
