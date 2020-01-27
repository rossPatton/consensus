import {
  POST_FAILURE,
  POST_SUCCESS,
  tFailureAction,
  tSuccessAction,
} from './_types';

export const failure = (payload: Error): tFailureAction => ({
  type: POST_FAILURE,
  payload,
});

export const success = (payload: tUser): tSuccessAction => ({
  type: POST_SUCCESS,
  payload,
});
