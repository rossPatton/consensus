import {
  LOGOUT_INIT,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  tInitAction,
  tFailureAction,
  tSuccessAction,
} from './_types';

export const init = (): tInitAction => ({
  type: LOGOUT_INIT,
});

export const failure = (payload: tResponseError): tFailureAction => ({
  type: LOGOUT_FAILURE,
  payload,
});

export const success = (payload: tSession): tSuccessAction => ({
  type: LOGOUT_SUCCESS,
  payload,
});
