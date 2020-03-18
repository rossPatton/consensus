import {
  GET_FAILURE,
  GET_SUCCESS,
  tFailureAction,
  tSuccessAction,
} from './_types';

export const failure = (payload: tResponseError): tFailureAction => ({
  type: GET_FAILURE,
  payload,
});

export const success = (payload: tOrg): tSuccessAction => ({
  type: GET_SUCCESS,
  payload,
});
