export const PATCH_USER_BY_ORG_BEGIN = 'PATCH_USER_BY_ORG_BEGIN';
export const PATCH_USER_BY_ORG_SUCCESS = 'PATCH_USER_BY_ORG_SUCCESS';
export const PATCH_USER_BY_ORG_FAILURE = 'PATCH_USER_BY_ORG_FAILURE';

export type tBeginAction = tAction<typeof PATCH_USER_BY_ORG_BEGIN>;

export type tSuccessAction = tAction<
  typeof PATCH_USER_BY_ORG_SUCCESS,
  tUsersByOrg
>;

export type tFailureAction = tAction<
  typeof PATCH_USER_BY_ORG_FAILURE,
  Error
>;
