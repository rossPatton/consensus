export const PATCH_FAILURE = '@@session/PATCH_FAILURE';
export const PATCH_SUCCESS = '@@session/PATCH_SUCCESS';
export type tFailureAction = tAction<typeof PATCH_FAILURE, Error>;
export type tSuccessAction = tAction<typeof PATCH_SUCCESS, tSession>;
