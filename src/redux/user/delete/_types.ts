export const DELETE_INIT = '@@user/DELETE_INIT';
export const DELETE_FAILURE = '@@user/DELETE_FAILURE';
export const DELETE_SUCCESS = '@@user/DELETE_SUCCESS';
export type tInitAction = ts.action<typeof DELETE_INIT>;
export type tFailureAction = ts.action<typeof DELETE_FAILURE, ts.responseError>;
export type tSuccessAction = ts.action<typeof DELETE_SUCCESS, ts.user>;

