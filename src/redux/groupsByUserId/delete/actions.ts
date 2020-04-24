import {
  DELETE_FAILURE,
  DELETE_INIT,
  DELETE_SUCCESS,
  tFailureAction,
  tInitAction,
  tSuccessAction,
} from './_types';

export const init = (): tInitAction => ({
  type: DELETE_INIT,
});

export const failure = (payload: tResponseError): tFailureAction => ({
  type: DELETE_FAILURE,
  payload,
});

export const success = (payload: {ok: true, groupId: number}): tSuccessAction => ({
  type: DELETE_SUCCESS,
  payload,
});
