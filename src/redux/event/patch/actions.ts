import {
  PATCH_INIT,
  PATCH_FAILURE,
  PATCH_SUCCESS,
  tInitAction,
  tFailureAction,
  tSuccessAction,
} from './_types';

export const init = (): tInitAction => ({
  type: PATCH_INIT,
});

export const failure = (payload: tResponseError): tFailureAction => ({
  type: PATCH_FAILURE,
  payload,
});

export const success = (payload: tEvent): tSuccessAction => ({
  type: PATCH_SUCCESS,
  payload,
});

