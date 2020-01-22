import { SET_ROLE, tSuccessAction } from './_types';

export const setRole = (payload: {role: tRole}): tSuccessAction => ({
  type: SET_ROLE,
  payload,
});
