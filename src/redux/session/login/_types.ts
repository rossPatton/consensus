export const LOGIN_INIT = '@@session/LOGIN_INIT';
export const LOGIN_FAILURE = '@@session/LOGIN_FAILURE';
export const LOGIN_SUCCESS = '@@session/LOGIN_SUCCESS';
export type tInitAction = tAction<typeof LOGIN_INIT>;
export type tFailureAction = tAction<typeof LOGIN_FAILURE, tResponseError>;
export type tSuccessAction = tAction<typeof LOGIN_SUCCESS, ts.session>;
