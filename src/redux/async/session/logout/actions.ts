import {
  LOGOUT_BEGIN,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  tBeginAction,
  tFailureAction,
  tSuccessAction,
} from './_types';

export const logOutBegin = (): tBeginAction => ({
  type: LOGOUT_BEGIN,
});

export const logOutSuccess = (payload: tSession): tSuccessAction => ({
  type: LOGOUT_SUCCESS,
  payload,
});

export const logOutFailure = (payload: Error): tFailureAction => ({
  type: LOGOUT_FAILURE,
  payload,
});
