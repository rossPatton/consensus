export const GET_USERS_BY_ORG_BEGIN = 'GET_USERS_BY_ORG_BEGIN';
export const GET_USERS_BY_ORG_SUCCESS = 'GET_USERS_BY_ORG_SUCCESS';
export const GET_USERS_BY_ORG_FAILURE = 'GET_USERS_BY_ORG_FAILURE';

export type tBeginAction = tAction<typeof GET_USERS_BY_ORG_BEGIN>;

export type tSuccessAction = tAction<
  typeof GET_USERS_BY_ORG_SUCCESS,
  tUsersByOrg
>;

export type tFailureAction = tAction<
  typeof GET_USERS_BY_ORG_FAILURE,
  Error
>;
