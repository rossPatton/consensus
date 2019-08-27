import { tBeginAction, tFailureAction, tSuccessAction } from './_types';

export const UPDATE_USER_BEGIN = 'UPDATE_USER_BEGIN';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

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
