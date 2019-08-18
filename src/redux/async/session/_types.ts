export const AUTHENTICATE_BEGIN = 'AUTHENTICATE_BEGIN';
export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS';
export const AUTHENTICATE_FAILURE = 'AUTHENTICATE_FAILURE';

export const LOG_OUT_BEGIN = 'LOG_OUT_BEGIN';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export type tBeginAction = tAction<typeof AUTHENTICATE_BEGIN, tLogin>;
export type tSuccessAction = tAction<typeof AUTHENTICATE_SUCCESS, tSession>;
export type tFailureAction = tAction<typeof AUTHENTICATE_FAILURE, Error>;
export type tActionUnion = tBeginAction | tSuccessAction | tFailureAction;

export type tLogOutBeginAction = tAction<typeof LOG_OUT_BEGIN>;
export type tLogOutSuccessAction = tAction<typeof LOG_OUT_SUCCESS, tSession>;
export type tLogOutFailureAction = tAction<typeof LOG_OUT_FAILURE, Error>;
export type tLogOutActionUnion =
  tLogOutBeginAction | tLogOutSuccessAction | tLogOutFailureAction;

export type tSessionUnion = tActionUnion | tLogOutActionUnion;
