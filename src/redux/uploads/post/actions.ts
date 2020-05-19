import {
  POST_FAILURE,
  POST_INIT,
  POST_SUCCESS,
  tFailureAction,
  tInitAction,
  tSuccessAction,
} from './_types';

export const init = (): tInitAction => ({
  type: POST_INIT,
});

export const failure = (payload: ts.responseError): tFailureAction => ({
  type: POST_FAILURE,
  payload,
});

export const success = (payload: ts.upload): tSuccessAction => ({
  type: POST_SUCCESS,
  payload,
});
