export const GET_INIT = '@@cities/GET_INIT';
export const GET_FAILURE = '@@cities/GET_FAILURE';
export const GET_SUCCESS = '@@cities/GET_SUCCESS';
export type tInitAction = ts.action<typeof GET_INIT>;
export type tFailureAction = ts.action<typeof GET_FAILURE, ts.responseError>;
export type tSuccessAction = ts.action<typeof GET_SUCCESS, ts.city[]>;
