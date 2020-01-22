import { SET_USER_BY_ORG, tSuccessAction } from './_types';

export const setUserByOrg = (payload: any): tSuccessAction => ({
  type: SET_USER_BY_ORG,
  payload,
});
