import {
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  tFailureAction,
  tSuccessAction,
} from './_types';

export const failure = (payload: tResponseError): tFailureAction => ({
  type: LOGOUT_FAILURE,
  payload,
});

export const success = (payload: {isAuthenticated: false}): tSuccessAction => ({
  type: LOGOUT_SUCCESS,
  payload,
});
