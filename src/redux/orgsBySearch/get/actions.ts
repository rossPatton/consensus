import {
  GET_FAILURE,
  GET_SUCCESS,
  tFailureAction,
  tSuccessAction,
} from './_types';

export const getGroupsBySearchFailure = (payload: tResponseError): tFailureAction => ({
  type: GET_FAILURE,
  payload,
});

export const getGroupsBySearchSuccess = (payload: tGroup[]): tSuccessAction => ({
  type: GET_SUCCESS,
  payload,
});
