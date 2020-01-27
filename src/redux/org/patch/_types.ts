export const PATCH_FAILURE = '@@org/PATCH_FAILURE';
export const PATCH_SUCCESS = '@@org/PATCH_SUCCESS';
export type tFailureAction = tAction<typeof PATCH_FAILURE, Error>;
export type tSuccessAction = tAction<typeof PATCH_SUCCESS, tOrg>;
