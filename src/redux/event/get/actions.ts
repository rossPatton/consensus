import {
  GET_BEGIN,
  GET_FAILURE,
  GET_SUCCESS,
  tBeginAction,
  tFailureAction,
  tSuccessAction,
} from './_types';

export const begin = (): tBeginAction => ({
  type: GET_BEGIN,
});

export const failure = (payload: Error): tFailureAction => ({
  type: GET_FAILURE,
  payload,
});

export const success = (payload: tEvent): tSuccessAction => ({
  type: GET_SUCCESS,
  payload,
});
