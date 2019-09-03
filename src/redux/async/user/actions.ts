import {
  GET_USER_BEGIN,
  GET_USER_FAILURE,
  GET_USER_SUCCESS,
  tBeginAction,
  tFailureAction,
  tSuccessAction,
} from './_types';

export const getUserBegin = (): tBeginAction => ({
  type: GET_USER_BEGIN,
});

export const getUserSuccess = (payload: tThunk<tUser[]>): tSuccessAction => ({
  type: GET_USER_SUCCESS,
  payload,
});

export const getUserFailure = (payload: Error): tFailureAction => ({
  type: GET_USER_FAILURE,
  payload,
});
