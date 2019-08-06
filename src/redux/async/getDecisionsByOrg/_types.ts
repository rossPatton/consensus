export const GET_DECISIONS_BEGIN = 'GET_DECISIONS_BEGIN';
export const GET_DECISIONS_SUCCESS = 'GET_DECISIONS_SUCCESS';
export const GET_DECISIONS_FAILURE = 'GET_DECISIONS_FAILURE';

export type tBeginAction = tAction<typeof GET_DECISIONS_BEGIN>;
export type tSuccessAction = tAction<typeof GET_DECISIONS_SUCCESS, tThunk<tDecision[]>>;
export type tFailureAction = tAction<typeof GET_DECISIONS_FAILURE, Error>;
export type tActionUnion = tBeginAction | tSuccessAction | tFailureAction;
