import {
  GET_FAILURE,
  GET_SUCCESS,
  tFailureAction,
  tSuccessAction,
} from './_types';

export const failure = (payload: Error): tFailureAction => ({
  type: GET_FAILURE,
  payload,
});

export const success = (payload: tUser[]): tSuccessAction => ({
  type: GET_SUCCESS,
  payload,
});


