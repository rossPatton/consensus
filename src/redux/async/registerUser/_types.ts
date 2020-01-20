export const REGISTER_USER_BEGIN = 'REGISTER_USER_BEGIN';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

export type tBeginAction = tAction<typeof REGISTER_USER_BEGIN>;
export type tSuccessAction = tAction<typeof REGISTER_USER_SUCCESS, tUser | null>;
export type tFailureAction = tAction<typeof REGISTER_USER_FAILURE, Error>;
export type tActionUnion = tBeginAction | tSuccessAction | tFailureAction;

