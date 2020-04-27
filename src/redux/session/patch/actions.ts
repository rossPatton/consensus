import {
  // PATCH_INIT,
  PATCH_FAILURE,
  PATCH_SUCCESS,
  // tInitAction,
  tFailureAction,
  tSuccessAction,
} from './_types';

// export const init = (): tInitAction => ({
//   type: PATCH_INIT,
// });

export const failure = (payload: ts.responseError): tFailureAction => ({
  type: PATCH_FAILURE,
  payload,
});

export const success = (payload: ts.session): tSuccessAction => ({
  type: PATCH_SUCCESS,
  payload,
});
