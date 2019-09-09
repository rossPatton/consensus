export const DELETE_USER_BY_ORG_BEGIN = 'DELETE_USER_BY_ORG_BEGIN';
export const DELETE_USER_BY_ORG_SUCCESS = 'DELETE_USER_BY_ORG_SUCCESS';
export const DELETE_USER_BY_ORG_FAILURE = 'DELETE_USER_BY_ORG_FAILURE';

export const GET_USERS_BY_ORG_BEGIN = 'GET_USERS_BY_ORG_BEGIN';
export const GET_USERS_BY_ORG_SUCCESS = 'GET_USERS_BY_ORG_SUCCESS';
export const GET_USERS_BY_ORG_FAILURE = 'GET_USERS_BY_ORG_FAILURE';

export const POST_USER_BY_ORG_BEGIN = 'POST_USER_BY_ORG_BEGIN';
export const POST_USER_BY_ORG_SUCCESS = 'POST_USER_BY_ORG_SUCCESS';
export const POST_USER_BY_ORG_FAILURE = 'POST_USER_BY_ORG_FAILURE';

export const SET_USER_BY_ORG = 'SET_USER_BY_ORG';

export type tBeginAction = tAction<
  typeof DELETE_USER_BY_ORG_BEGIN |
  typeof GET_USERS_BY_ORG_BEGIN |
  typeof POST_USER_BY_ORG_BEGIN
>;

export type tSuccessAction = tAction<
  typeof DELETE_USER_BY_ORG_SUCCESS |
  typeof GET_USERS_BY_ORG_SUCCESS |
  typeof POST_USER_BY_ORG_SUCCESS |
  typeof SET_USER_BY_ORG,
  tThunk<tUsersByOrg>
>;

export type tFailureAction = tAction<
  typeof DELETE_USER_BY_ORG_FAILURE |
  typeof GET_USERS_BY_ORG_FAILURE |
  typeof POST_USER_BY_ORG_FAILURE,
  Error
>;

export type tActionUnion = tBeginAction | tSuccessAction | tFailureAction;
