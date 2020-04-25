import {
  PATCH_FAILURE,
  PATCH_INIT,
  PATCH_SUCCESS,
  tFailureAction,
  tInitAction,
  tSuccessAction,
} from './_types';

export const init = (): tInitAction => ({
  type: PATCH_INIT,
});

export const failure = (payload: tResponseError): tFailureAction => ({
  type: PATCH_FAILURE,
  payload,
});

export const success = (payload: tRSVP): tSuccessAction => ({
  type: PATCH_SUCCESS,
  payload,
});

