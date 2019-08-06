import { tBeginAction, tSuccessAction, tFailureAction } from './_types';

export const REGISTER_USER_BEGIN = 'REGISTER_USER_BEGIN';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

export const registerUserBegin = (): tBeginAction => ({
  type: REGISTER_USER_BEGIN,
});

export const registerUserSuccess = (payload: tThunk<tUser | null>): tSuccessAction => ({
  type: REGISTER_USER_SUCCESS,
  payload,
});

export const registerUserFailure = (payload: Error): tFailureAction => ({
  type: REGISTER_USER_FAILURE,
  payload,
});
