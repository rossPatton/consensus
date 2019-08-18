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

export const authenticateSuccess = (payload: tSession): tSuccessAction => {
  console.log('authentication success => ', payload);
  return {
    type: AUTHENTICATE_SUCCESS,
    payload,
  };
};

export const authenticateFailure = (payload: Error): tFailureAction => ({
  type: AUTHENTICATE_FAILURE,
  payload,
});
