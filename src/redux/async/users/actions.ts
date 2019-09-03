import {
  GET_USERS_BEGIN,
  GET_USERS_FAILURE,
  GET_USERS_SUCCESS,
  tBeginAction,
  tFailureAction,
  tSuccessAction,
} from './_types';

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
