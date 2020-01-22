import {
  LOGIN_BEGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  tBeginAction,
  tFailureAction,
  tSuccessAction,
} from './_types';

export const loginBegin = (): tBeginAction => ({
  type: LOGIN_BEGIN,
});

export const loginSuccess = (payload: tSession): tSuccessAction => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const loginFailure = (payload: Error): tFailureAction => ({
  type: LOGIN_FAILURE,
  payload,
});
