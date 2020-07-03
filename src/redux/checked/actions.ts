import {
  CHECK_FAILURE,
  CHECK_SUCCESS,
  tFailureAction,
  tSuccessAction,
} from './_types';

export const failure = (payload: ts.responseError): tFailureAction => ({
  type: CHECK_FAILURE,
  payload,
});

export const success = (payload: object): tSuccessAction => ({
  type: CHECK_SUCCESS,
  payload,
});
