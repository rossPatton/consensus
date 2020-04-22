import {
  GET_INIT,
  GET_FAILURE,
  GET_SUCCESS,
  tInitAction,
  tFailureAction,
  tSuccessAction,
} from './_types';

export const init = (): tInitAction => ({
  type: GET_INIT,
});

export const failure = (payload: tResponseError): tFailureAction => ({
  type: GET_FAILURE,
  payload,
});

export const success = (payload: tCountry): tSuccessAction => ({
  type: GET_SUCCESS,
  payload,
});
