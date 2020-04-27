// export const PATCH_INIT = '@@session/PATCH_INIT';
export const PATCH_FAILURE = '@@session/PATCH_FAILURE';
export const PATCH_SUCCESS = '@@session/PATCH_SUCCESS';
// export type tInitAction = tAction<typeof PATCH_INIT>;
export type tFailureAction = tAction<typeof PATCH_FAILURE, tResponseError>;
export type tSuccessAction = tAction<typeof PATCH_SUCCESS, ts.session>;
