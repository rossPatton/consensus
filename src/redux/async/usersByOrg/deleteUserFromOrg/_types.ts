export const DELETE_USER_FROM_ORG_BEGIN = 'DELETE_USER_FROM_ORG_BEGIN';
export const DELETE_USER_FROM_ORG_SUCCESS = 'DELETE_USER_FROM_ORG_SUCCESS';
export const DELETE_USER_FROM_ORG_FAILURE = 'DELETE_USER_FROM_ORG_FAILURE';

export type tBeginAction = tAction<typeof DELETE_USER_FROM_ORG_BEGIN>;

export type tSuccessAction = tAction<
  typeof DELETE_USER_FROM_ORG_SUCCESS,
  tUsersByOrg
>;

export type tFailureAction = tAction<
  typeof DELETE_USER_FROM_ORG_FAILURE,
  Error
>;
