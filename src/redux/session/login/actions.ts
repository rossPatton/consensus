import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  tFailureAction,
  tSuccessAction,
} from './_types';

export const failure = (payload: tResponseError): tFailureAction => ({
  type: LOGIN_FAILURE,
  payload,
});

export const success = (payload: tSession): tSuccessAction => ({
  type: LOGIN_SUCCESS,
  payload,
});
