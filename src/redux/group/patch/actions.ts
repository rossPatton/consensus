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

export const failure = (payload: ts.responseError): tFailureAction => ({
  type: PATCH_FAILURE,
  payload,
});

export const success = (payload: ts.group): tSuccessAction => ({
  type: PATCH_SUCCESS,
  payload,
});
