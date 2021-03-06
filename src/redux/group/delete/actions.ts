import {
  DELETE_FAILURE,
  DELETE_INIT,
  DELETE_SUCCESS,
  tFailureAction,
  tInitAction,
  tSuccessAction,
} from './_types';

export const init = (): tInitAction => ({
  type: DELETE_INIT,
});

export const failure = (payload: ts.responseError): tFailureAction => ({
  type: DELETE_FAILURE,
  payload,
});

export const success = (payload: ts.group): tSuccessAction => ({
  type: DELETE_SUCCESS,
  payload,
});
