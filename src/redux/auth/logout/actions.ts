import {
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  tFailureAction,
  tSuccessAction,
} from './_types';

export const logoutFailure = (payload: Error): tFailureAction => ({
  type: LOGOUT_FAILURE,
  payload,
});

export const logoutSuccess = (payload: {isAuthenticated: false}): tSuccessAction => ({
  type: LOGOUT_SUCCESS,
  payload,
});
