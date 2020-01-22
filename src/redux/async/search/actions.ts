import {
  GET_ORGS_BY_SEARCH_BEGIN,
  GET_ORGS_BY_SEARCH_FAILURE,
  GET_ORGS_BY_SEARCH_SUCCESS,
  tBeginAction,
  tFailureAction,
  tSuccessAction,
} from './_types';

export const getOrgsBySearchBegin = (): tBeginAction => ({
  type: GET_ORGS_BY_SEARCH_BEGIN,
});

export const getOrgsBySearchSuccess = (payload: tOrg[]): tSuccessAction => ({
  type: GET_ORGS_BY_SEARCH_SUCCESS,
  payload,
});

export const getOrgsBySearchFailure = (payload: Error): tFailureAction => ({
  type: GET_ORGS_BY_SEARCH_FAILURE,
  payload,
});
