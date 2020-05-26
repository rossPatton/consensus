export const GET_INIT = '@@invites/GET_INIT';
export const GET_FAILURE = '@@invites/GET_FAILURE';
export const GET_SUCCESS = '@@invites/GET_SUCCESS';
export type tInitAction = ts.action<typeof GET_INIT>;
export type tFailureAction = ts.action<typeof GET_FAILURE, ts.responseError>;
export type tSuccessAction = ts.action<typeof GET_SUCCESS, ts.userInvite[]>;
