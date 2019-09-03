export const GET_USERS_BEGIN = 'GET_USERS_BEGIN';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAILURE = 'GET_USERS_FAILURE';

export type tBeginAction = tAction<typeof GET_USERS_BEGIN>;
export type tSuccessAction = tAction<typeof GET_USERS_SUCCESS, tThunk<tUser[]>>;
export type tFailureAction = tAction<typeof GET_USERS_FAILURE, Error>;
export type tActionUnion = tBeginAction | tSuccessAction | tFailureAction;
