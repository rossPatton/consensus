export const GET_INIT = '@@groupsByUserId/GET_INIT';
export const GET_SUCCESS = '@@groupsByUserId/GET_SUCCESS';
export const GET_FAILURE = '@@groupsByUserId/GET_FAILURE';
export type tInitAction = ts.action<typeof GET_INIT>;
export type tFailureAction = ts.action<typeof GET_FAILURE, ts.responseError>;
export type tSuccessAction = ts.action<typeof GET_SUCCESS, ts.group[]>;
