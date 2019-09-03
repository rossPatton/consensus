export const GET_USER_BEGIN = 'GET_USER_BEGIN';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

export type tBeginAction = tAction<typeof GET_USER_BEGIN>;
export type tSuccessAction = tAction<typeof GET_USER_SUCCESS, tThunk<tUser[]>>;
export type tFailureAction = tAction<typeof GET_USER_FAILURE, Error>;
export type tActionUnion = tBeginAction | tSuccessAction | tFailureAction;
