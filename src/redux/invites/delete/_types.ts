export const DELETE_INIT = '@@invites/DELETE_INIT';
export const DELETE_FAILURE = '@@invites/DELETE_FAILURE';
export const DELETE_SUCCESS = '@@invites/DELETE_SUCCESS';
export type tInitAction = ts.action<typeof DELETE_INIT>;
export type tFailureAction = ts.action<typeof DELETE_FAILURE, ts.responseError>;
export type tSuccessAction = ts.action<typeof DELETE_SUCCESS, {userId: number}>;
