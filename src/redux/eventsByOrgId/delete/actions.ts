import {
  DELETE_FAILURE,
  DELETE_SUCCESS,
  tFailureAction,
  tSuccessAction,
} from './_types';

export const deleteEventFailure = (payload: Error): tFailureAction => ({
  type: DELETE_FAILURE,
  payload,
});

export const deleteEventSuccess = (payload: tIdQuery): tSuccessAction => ({
  type: DELETE_SUCCESS,
  payload,
});
