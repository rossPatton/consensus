export const POST_USER_TO_ORG_BEGIN = 'POST_USER_TO_ORG_BEGIN';
export const POST_USER_TO_ORG_SUCCESS = 'POST_USER_TO_ORG_SUCCESS';
export const POST_USER_TO_ORG_FAILURE = 'POST_USER_TO_ORG_FAILURE';

export type tBeginAction = tAction<typeof POST_USER_TO_ORG_BEGIN>;

export type tSuccessAction = tAction<
  typeof POST_USER_TO_ORG_SUCCESS,
  tUsersByOrg
>;

export type tFailureAction = tAction<
  typeof POST_USER_TO_ORG_FAILURE,
  Error
>;
