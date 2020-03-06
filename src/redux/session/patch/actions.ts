import {
  PATCH_FAILURE,
  PATCH_SUCCESS,
  tFailureAction,
  tSuccessAction,
} from './_types';

export const failure = (payload: Error): tFailureAction => ({
  type: PATCH_FAILURE,
  payload,
});

export const success = (payload: tSession): tSuccessAction => ({
  type: PATCH_SUCCESS,
  payload,
});
