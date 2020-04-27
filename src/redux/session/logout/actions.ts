import {
  LOGOUT_FAILURE,
  LOGOUT_INIT,
  LOGOUT_SUCCESS,
  tFailureAction,
  tInitAction,
  tSuccessAction,
} from './_types';

export const init = (): tInitAction => ({
  type: LOGOUT_INIT,
});

export const failure = (payload: tResponseError): tFailureAction => ({
  type: LOGOUT_FAILURE,
  payload,
});

export const success = (payload: ts.session): tSuccessAction => ({
  type: LOGOUT_SUCCESS,
  payload,
});
