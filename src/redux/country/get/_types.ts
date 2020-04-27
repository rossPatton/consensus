export const GET_INIT = '@@country/GET_INIT';
export const GET_FAILURE = '@@country/GET_FAILURE';
export const GET_SUCCESS = '@@country/GET_SUCCESS';
export type tInitAction = ts.action<typeof GET_INIT>;
export type tFailureAction = ts.action<typeof GET_FAILURE, ts.responseError>;
export type tSuccessAction = ts.action<typeof GET_SUCCESS, ts.country>;
