import {
  DELETE_INIT,
  DELETE_FAILURE,
  DELETE_SUCCESS,
  tInitAction,
  tFailureAction,
  tSuccessAction,
} from './_types';

export const init = (): tInitAction => ({
  type: DELETE_INIT,
});

export const failure = (payload: tResponseError): tFailureAction => ({
  type: DELETE_FAILURE,
  payload,
});

export const success = (payload: tUser): tSuccessAction => ({
  type: DELETE_SUCCESS,
  payload,
});
