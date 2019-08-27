import {
  AUTHENTICATE_BEGIN,
  AUTHENTICATE_FAILURE,
  AUTHENTICATE_SUCCESS,
  LOG_OUT_BEGIN,
  LOG_OUT_FAILURE,
  LOG_OUT_SUCCESS,
  tBeginAction,
  tFailureAction,
  tLogOutBeginAction,
  tLogOutFailureAction,
  tLogOutSuccessAction,
  tSuccessAction,
} from './_types';

export const authenticateBegin = (payload: tLogin): tBeginAction => ({
  type: AUTHENTICATE_BEGIN,
  payload,
});

export const authenticateSuccess = (payload: tSession): tSuccessAction => ({
  type: AUTHENTICATE_SUCCESS,
  payload,
});

export const authenticateFailure = (payload: Error): tFailureAction => ({
  type: AUTHENTICATE_FAILURE,
  payload,
});

export const logOutBegin = (): tLogOutBeginAction => ({
  type: LOG_OUT_BEGIN,
});

export const logOutSuccess = (payload: tSession): tLogOutSuccessAction => ({
  type: LOG_OUT_SUCCESS,
  payload,
});

export const logOutFailure = (payload: Error): tLogOutFailureAction => ({
  type: LOG_OUT_FAILURE,
  payload,
});
