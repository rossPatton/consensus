import {
  LOGIN_FAILURE,
  LOGIN_INIT,
  LOGIN_SUCCESS,
  tFailureAction,
  tInitAction,
  tSuccessAction,
} from './_types';

export const init = (): tInitAction => ({
  type: LOGIN_INIT,
});

export const failure = (payload: tResponseError): tFailureAction => ({
  type: LOGIN_FAILURE,
  payload,
});

export const success = (payload: tSession): tSuccessAction => ({
  type: LOGIN_SUCCESS,
  payload,
});
