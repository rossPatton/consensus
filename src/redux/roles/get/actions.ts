import {
  GET_FAILURE,
  GET_INIT,
  GET_SUCCESS,
  tFailureAction,
  tInitAction,
  tSuccessAction,
} from './_types';

export const init = (): tInitAction => ({type: GET_INIT});

export const failure = (payload: ts.responseError): tFailureAction => ({
  type: GET_FAILURE,
  payload,
});

export const success = (payload: ts.roleMap[]): tSuccessAction => ({
  type: GET_SUCCESS,
  payload,
});
