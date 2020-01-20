import {
  REGISTER_USER_BEGIN,
  REGISTER_USER_FAILURE,
  REGISTER_USER_SUCCESS,
  tBeginAction,
  tFailureAction,
  tSuccessAction,
} from './_types';

export const registerUserBegin = (): tBeginAction => ({
  type: REGISTER_USER_BEGIN,
});

export const registerUserSuccess = (payload: tUser | null): tSuccessAction => ({
  type: REGISTER_USER_SUCCESS,
  payload,
});

export const registerUserFailure = (payload: Error): tFailureAction => ({
  type: REGISTER_USER_FAILURE,
  payload,
});
