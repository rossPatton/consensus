import { tBeginAction, tFailureAction, tSuccessAction } from './_types';

export const GET_USERS_BEGIN = 'GET_USERS_BEGIN';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAILURE = 'GET_USERS_FAILURE';

export const getUsersBegin = (): tBeginAction => ({
  type: GET_USERS_BEGIN,
});

export const getUsersSuccess = (payload: tThunk<tUser[]>): tSuccessAction => ({
  type: GET_USERS_SUCCESS,
  payload,
});

export const getUsersFailure = (payload: Error): tFailureAction => ({
  type: GET_USERS_FAILURE,
  payload,
});
