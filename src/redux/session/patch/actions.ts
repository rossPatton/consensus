import {
  PATCH_FAILURE,
  PATCH_SUCCESS,
  tFailureAction,
  tSuccessAction,
} from './_types';

export const failure = (payload: ts.responseError): tFailureAction => ({
  type: PATCH_FAILURE,
  payload,
});

export const success = (payload: ts.session): tSuccessAction => ({
  type: PATCH_SUCCESS,
  payload,
});
