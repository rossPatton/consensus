export const PATCH_INIT = '@@group/PATCH_INIT';
export const PATCH_FAILURE = '@@group/PATCH_FAILURE';
export const PATCH_SUCCESS = '@@group/PATCH_SUCCESS';
export type tInitAction = ts.action<typeof PATCH_INIT>;
export type tFailureAction = ts.action<typeof PATCH_FAILURE, ts.responseError>;
export type tSuccessAction = ts.action<typeof PATCH_SUCCESS, ts.group>;
