import {
  tBeginAction,
  tFailureAction,
  tSuccessAction,
  UPDATE_USER_BEGIN,
  UPDATE_USER_FAILURE,
  UPDATE_USER_SUCCESS,
} from './_types';

export const updateUserBegin = (): tBeginAction => ({
  type: UPDATE_USER_BEGIN,
});

export const updateUserSuccess = (payload: tThunk<tSession>): tSuccessAction => ({
  type: UPDATE_USER_SUCCESS,
  payload,
});

export const updateUserFailure = (payload: Error): tFailureAction => ({
  type: UPDATE_USER_FAILURE,
  payload,
});
