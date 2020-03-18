import {
  GET_FAILURE,
  GET_SUCCESS,
  tFailureAction,
  tSuccessAction,
} from './_types';

export const getOrgsBySearchFailure = (payload: tResponseError): tFailureAction => ({
  type: GET_FAILURE,
  payload,
});

export const getOrgsBySearchSuccess = (payload: tOrg[]): tSuccessAction => ({
  type: GET_SUCCESS,
  payload,
});
