export const PATCH_FAILURE = '@@event/PATCH_FAILURE';
export const PATCH_SUCCESS = '@@event/PATCH_SUCCESS';
export type tFailureAction = tAction<typeof PATCH_FAILURE, tResponseError>;
export type tSuccessAction = tAction<typeof PATCH_SUCCESS, tEvent>;
