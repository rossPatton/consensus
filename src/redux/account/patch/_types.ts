export const PATCH_INIT = '@@account/PATCH_INIT';
export const PATCH_FAILURE = '@@account/PATCH_FAILURE';
export const PATCH_SUCCESS = '@@account/PATCH_SUCCESS';
export type tInitAction = tAction<typeof PATCH_INIT>;
export type tFailureAction = tAction<typeof PATCH_FAILURE, tResponseError>;
export type tSuccessAction = tAction<typeof PATCH_SUCCESS, tSession>;

