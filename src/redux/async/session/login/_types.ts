export const LOGIN_BEGIN = 'LOGIN_BEGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export type tBeginAction = tAction<typeof LOGIN_BEGIN>;
export type tSuccessAction = tAction<typeof LOGIN_SUCCESS, tSession>;
export type tFailureAction = tAction<typeof LOGIN_FAILURE, Error>;
