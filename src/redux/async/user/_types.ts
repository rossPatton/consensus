export const GET_USER_BY_ID_BEGIN = 'GET_USER_BY_ID_BEGIN';
export const GET_USER_BY_ID_SUCCESS = 'GET_USER_BY_ID_SUCCESS';
export const GET_USER_BY_ID_FAILURE = 'GET_USER_BY_ID_FAILURE';

export type tBeginAction = tAction<typeof GET_USER_BY_ID_BEGIN>;
export type tSuccessAction = tAction<typeof GET_USER_BY_ID_SUCCESS, tUser>;
export type tFailureAction = tAction<typeof GET_USER_BY_ID_FAILURE, Error>;
export type tActionUnion = tBeginAction | tSuccessAction | tFailureAction;
