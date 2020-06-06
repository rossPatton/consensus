import {
  tFailureAction,
  tInitAction,
  tSuccessAction,
  VALIDATE_FAILURE,
  VALIDATE_INIT,
  VALIDATE_SUCCESS,
} from './_types';

export const init = (): tInitAction => ({
  type: VALIDATE_INIT,
});

export const failure = (payload: ts.responseError): tFailureAction => ({
  type: VALIDATE_FAILURE,
  payload,
});

export const success = (payload: any): tSuccessAction => ({
  type: VALIDATE_SUCCESS,
  payload,
});
