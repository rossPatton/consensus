export const LOGIN_INIT = '@@session/LOGIN_INIT';
export const LOGIN_FAILURE = '@@session/LOGIN_FAILURE';
export const LOGIN_SUCCESS = '@@session/LOGIN_SUCCESS';
export type tInitAction = ts.action<typeof LOGIN_INIT>;
export type tFailureAction = ts.action<typeof LOGIN_FAILURE, ts.responseError>;
export type tSuccessAction = ts.action<typeof LOGIN_SUCCESS, ts.session>;
