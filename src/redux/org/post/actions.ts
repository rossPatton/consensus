import {
  POST_FAILURE,
  POST_SUCCESS,
  tFailureAction,
  tSuccessAction,
} from './_types';

export const failure = (payload: tResponseError): tFailureAction => ({
  type: POST_FAILURE,
  payload,
});


export const success = (payload: tGroup): tSuccessAction => ({
  type: POST_SUCCESS,
  payload,
});
