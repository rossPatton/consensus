import {
  GET_ROLES_BEGIN,
  GET_ROLES_FAILURE,
  GET_ROLES_SUCCESS,
  SET_ROLE,
  tBeginAction,
  tFailureAction,
  tSuccessAction,
} from './_types';

export const getRolesBegin = (): tBeginAction => ({
  type: GET_ROLES_BEGIN,
});

export const getRolesSuccess = (payload: tRoleMap[]): tSuccessAction => ({
  type: GET_ROLES_SUCCESS,
  payload,
});

export const getRolesFailure = (payload: Error): tFailureAction => ({
  type: GET_ROLES_FAILURE,
  payload,
});

export const setRole = (payload: {role: tRole}): tSuccessAction => ({
  type: SET_ROLE,
  payload,
});
