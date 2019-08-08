export const AUTHENTICATE_BEGIN = 'AUTHENTICATE_USER_BEGIN';
export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_USER_SUCCESS';
export const AUTHENTICATE_FAILURE = 'AUTHENTICATE_USER_FAILURE';

export type tBeginAction = tAction<typeof AUTHENTICATE_BEGIN, tLogin>;
export type tSuccessAction = tAction<typeof AUTHENTICATE_SUCCESS, tSession>;
export type tFailureAction = tAction<typeof AUTHENTICATE_FAILURE, Error>;
export type tActionUnion = tBeginAction | tSuccessAction | tFailureAction;
