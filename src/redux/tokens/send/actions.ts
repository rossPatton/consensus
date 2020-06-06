import {
  SEND_FAILURE,
  SEND_INIT,
  SEND_SUCCESS,
  tFailureAction,
  tInitAction,
  tSuccessAction,
} from './_types';

export const init = (): tInitAction => ({
  type: SEND_INIT,
});

export const failure = (payload: ts.responseError): tFailureAction => ({
  type: SEND_FAILURE,
  payload,
});

export const success = (payload: any): tSuccessAction => ({
  type: SEND_SUCCESS,
  payload,
});
