export const LOGOUT_BEGIN = 'LOG_OUT_BEGIN';
export const LOGOUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOG_OUT_FAILURE';
export type tBeginAction = tAction<typeof LOGOUT_BEGIN>;
export type tSuccessAction = tAction<typeof LOGOUT_SUCCESS, tSession>;
export type tFailureAction = tAction<typeof LOGOUT_FAILURE, Error>;
