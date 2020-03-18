export const PATCH_FAILURE = '@@user/PATCH_FAILURE';
export const PATCH_SUCCESS = '@@user/PATCH_SUCCESS';
export type tFailureAction = tAction<typeof PATCH_FAILURE, tResponseError>;
export type tSuccessAction = tAction<typeof PATCH_SUCCESS, tUser>;

