import {
  POST_INIT,
  POST_FAILURE,
  POST_SUCCESS,
  tInitAction,
  tFailureAction,
  tSuccessAction,
} from './_types';

export const init = (): tInitAction => ({
  type: POST_INIT,
});

export const failure = (payload: tResponseError): tFailureAction => ({
  type: POST_FAILURE,
  payload,
});

export const success = (payload: tRSVP): tSuccessAction => ({
  type: POST_SUCCESS,
  payload,
});

