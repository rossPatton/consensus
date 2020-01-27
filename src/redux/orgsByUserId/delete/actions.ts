import {
  DELETE_FAILURE,
  DELETE_SUCCESS,
  tFailureAction,
  tSuccessAction,
} from './_types';

export const failure = (payload: Error): tFailureAction => ({
  type: DELETE_FAILURE,
  payload,
});

export const success = (payload: {ok: true, orgId: number}): tSuccessAction => ({
  type: DELETE_SUCCESS,
  payload,
});
