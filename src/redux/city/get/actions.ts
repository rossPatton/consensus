import {
  GET_FAILURE,
  GET_SUCCESS,
  tFailureAction,
  tSuccessAction,
} from './_types';

export const getCityFailure = (payload: Error): tFailureAction => ({
  type: GET_FAILURE,
  payload,
});

export const getCitySuccess = (payload: tCity): tSuccessAction => ({
  type: GET_SUCCESS,
  payload,
});
