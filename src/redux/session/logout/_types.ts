export const LOGOUT_INIT = '@@session/LOGOUT_INIT';
export const LOGOUT_FAILURE = '@@session/LOGOUT_FAILURE';
export const LOGOUT_SUCCESS = '@@session/LOGOUT_SUCCESS';
export type tInitAction = ts.action<typeof LOGOUT_INIT>;
export type tFailureAction = ts.action<typeof LOGOUT_FAILURE, ts.responseError>;
export type tSuccessAction = ts.action<typeof LOGOUT_SUCCESS, ts.session>;
