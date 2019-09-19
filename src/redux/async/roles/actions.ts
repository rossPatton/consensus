import {
  GET_ROLES_BEGIN,
  GET_ROLES_FAILURE,
  GET_ROLES_SUCCESS,
  SET_ROLE,
  tBeginAction,
  tFailureAction,
  tSuccessAction,
} from './_types';

export const getRoleBegin = (): tBeginAction => ({
  type: GET_ROLES_BEGIN,
});

export const getRoleSuccess = (payload: any): tSuccessAction => ({
  type: GET_ROLES_SUCCESS,
  payload,
});

export const getRoleFailure = (payload: Error): tFailureAction => ({
  type: GET_ROLES_FAILURE,
  payload,
});

export const setRole = (payload: any): tSuccessAction => ({
  type: SET_ROLE,
  payload,
});
