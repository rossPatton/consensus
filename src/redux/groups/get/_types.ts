export const GET_INIT = '@@groups/GET_INIT';
export const GET_SUCCESS = '@@groups/GET_SUCCESS';
export const GET_FAILURE = '@@groups/GET_FAILURE';
export type tInitAction = ts.action<typeof GET_INIT>;
export type tFailureAction = ts.action<typeof GET_FAILURE, ts.responseError>;
export type tSuccessAction = ts.action<typeof GET_SUCCESS, ts.group[]>;
