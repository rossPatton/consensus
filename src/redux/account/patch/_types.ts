export const PATCH_FAILURE = '@@account/PATCH_FAILURE';
export const PATCH_SUCCESS = '@@account/PATCH_SUCCESS';
export type tFailureAction = tAction<typeof PATCH_FAILURE, tResponseError>;
export type tSuccessAction = tAction<typeof PATCH_SUCCESS, tSession>;

