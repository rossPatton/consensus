export const PATCH_INIT = '@@account/PATCH_INIT';
export const PATCH_FAILURE = '@@account/PATCH_FAILURE';
export const PATCH_SUCCESS = '@@account/PATCH_SUCCESS';
export type tInitAction = ts.action<typeof PATCH_INIT>;
export type tFailureAction = ts.action<typeof PATCH_FAILURE, ts.responseError>;
export type tSuccessAction = ts.action<typeof PATCH_SUCCESS, ts.session>;

