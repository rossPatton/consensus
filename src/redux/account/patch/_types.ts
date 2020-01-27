export const PATCH_FAILURE = '@@account/PATCH_FAILURE';
export const PATCH_SUCCESS = '@@account/PATCH_FAILURE';
export type tFailureAction = tAction<typeof PATCH_FAILURE, Error>;
export type tSuccessAction = tAction<typeof PATCH_SUCCESS, tSession>;

