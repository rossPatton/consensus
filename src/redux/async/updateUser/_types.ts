export const UPDATE_USER_BEGIN = 'UPDATE_USER_BEGIN';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

export type tBeginAction = tAction<typeof UPDATE_USER_BEGIN>;
export type tSuccessAction = tAction<typeof UPDATE_USER_SUCCESS, tThunk<tSession>>;
export type tFailureAction = tAction<typeof UPDATE_USER_FAILURE, Error>;
export type tActionUnion = tBeginAction | tSuccessAction | tFailureAction;

