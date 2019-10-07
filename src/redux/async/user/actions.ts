import {
  GET_USER_BY_ID_BEGIN,
  GET_USER_BY_ID_FAILURE,
  GET_USER_BY_ID_SUCCESS,
  tBeginAction,
  tFailureAction,
  tSuccessAction,
} from './_types';

export const getUserByIdBegin = (): tBeginAction => ({
  type: GET_USER_BY_ID_BEGIN,
});

export const getUserByIdSuccess = (payload: tThunk<tUser>): tSuccessAction => ({
  type: GET_USER_BY_ID_SUCCESS,
  payload,
});

export const getUserByIdFailure = (payload: Error): tFailureAction => ({
  type: GET_USER_BY_ID_FAILURE,
  payload,
});
