import {
  DELETE_FAILURE,
  DELETE_SUCCESS,
  tFailureAction,
  tSuccessAction,
} from './_types';

export const failure = (payload: tResponseError): tFailureAction => ({
  type: DELETE_FAILURE,
  payload,
});

export const success = (payload: {userId: number}): tSuccessAction => ({
  type: DELETE_SUCCESS,
  payload,
});
