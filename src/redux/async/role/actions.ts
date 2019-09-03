import {
  GET_ROLE_BEGIN,
  GET_ROLE_FAILURE,
  GET_ROLE_SUCCESS,
  SET_ROLE,
  tBeginAction,
  tFailureAction,
  tSuccessAction,
} from './_types';

export const getRoleBegin = (): tBeginAction => ({
  type: GET_ROLE_BEGIN,
});

export const getRoleSuccess = (payload: any): tSuccessAction => ({
  type: GET_ROLE_SUCCESS,
  payload,
});

export const getRoleFailure = (payload: Error): tFailureAction => ({
  type: GET_ROLE_FAILURE,
  payload,
});

export const setRole = (payload: any): tSuccessAction => ({
  type: SET_ROLE,
  payload,
});
