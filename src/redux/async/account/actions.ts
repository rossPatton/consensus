import {
  PATCH_ACCOUNT_BEGIN,
  PATCH_ACCOUNT_FAILURE,
  PATCH_ACCOUNT_SUCCESS,
  tBeginAction,
  tFailureAction,
  tSuccessAction,
} from './_types';

export const patchAccountBegin = (): tBeginAction => ({
  type: PATCH_ACCOUNT_BEGIN,
});

export const patchAccountSuccess = (payload: tThunk<tSession>): tSuccessAction => ({
  type: PATCH_ACCOUNT_SUCCESS,
  payload,
});

export const patchAccountFailure = (payload: Error): tFailureAction => ({
  type: PATCH_ACCOUNT_FAILURE,
  payload,
});
