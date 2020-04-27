export const GET_INIT = '@@groupsBySearch/GET_INIT';
export const GET_SUCCESS = '@@groupsBySearch/GET_SUCCESS';
export const GET_FAILURE = '@@groupsBySearch/GET_FAILURE';
export type tInitAction = ts.action<typeof GET_INIT>;
export type tFailureAction = ts.action<typeof GET_FAILURE, ts.responseError>;
export type tSuccessAction = ts.action<typeof GET_SUCCESS, ts.group[]>;
