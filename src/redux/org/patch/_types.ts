export const PATCH_INIT = '@@org/PATCH_INIT';
export const PATCH_FAILURE = '@@org/PATCH_FAILURE';
export const PATCH_SUCCESS = '@@org/PATCH_SUCCESS';
export type tInitAction = tAction<typeof PATCH_INIT>;
export type tFailureAction = tAction<typeof PATCH_FAILURE, tResponseError>;
export type tSuccessAction = tAction<typeof PATCH_SUCCESS, tGroup>;
