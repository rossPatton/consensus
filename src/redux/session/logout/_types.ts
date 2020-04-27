export const LOGOUT_INIT = '@@session/LOGOUT_INIT';
export const LOGOUT_FAILURE = '@@session/LOGOUT_FAILURE';
export const LOGOUT_SUCCESS = '@@session/LOGOUT_SUCCESS';
export type tInitAction = tAction<typeof LOGOUT_INIT>;
export type tFailureAction = tAction<typeof LOGOUT_FAILURE, tResponseError>;
export type tSuccessAction = tAction<typeof LOGOUT_SUCCESS, ts.session>;
