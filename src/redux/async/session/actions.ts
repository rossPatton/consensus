import {
  AUTHENTICATE_BEGIN,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAILURE,
  tBeginAction,
  tSuccessAction,
  tFailureAction,
} from './_types';

export const authenticateBegin = (payload: tLogin): tBeginAction => ({
  type: AUTHENTICATE_BEGIN,
  payload,
});

export const authenticateSuccess = (payload: tAuth): tSuccessAction => ({
  type: AUTHENTICATE_SUCCESS,
  payload,
});

export const authenticateFailure = (payload: Error): tFailureAction => ({
  type: AUTHENTICATE_FAILURE,
  payload,
});
