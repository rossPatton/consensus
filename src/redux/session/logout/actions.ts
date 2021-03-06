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

export const failure = (payload: ts.responseError): tFailureAction => ({
  type: LOGOUT_FAILURE,
  payload,
});

export const success = (payload: ts.isAuthenticated): tSuccessAction => ({
  type: LOGOUT_SUCCESS,
  payload,
});
