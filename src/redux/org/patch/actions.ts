import {
  PATCH_FAILURE,
  PATCH_SUCCESS,
  tFailureAction,
  tSuccessAction,
} from './_types';

export const failure = (payload: tResponseError): tFailureAction => ({
  type: PATCH_FAILURE,
  payload,
});

export const success = (payload: tGroup): tSuccessAction => ({
  type: PATCH_SUCCESS,
  payload,
});
