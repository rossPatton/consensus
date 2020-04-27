export const GET_INIT = '@@group/GET_INIT';
export const GET_FAILURE = '@@group/GET_FAILURE';
export const GET_SUCCESS = '@@group/GET_SUCCESS';
export type tInitAction = ts.action<typeof GET_INIT>;
export type tFailureAction = ts.action<typeof GET_FAILURE, ts.responseError>;
export type tSuccessAction = ts.action<typeof GET_SUCCESS, ts.group>;
