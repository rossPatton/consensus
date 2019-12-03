export const SUBMIT_VOTE_BEGIN = 'SUBMIT_VOTE_BEGIN';
export const SUBMIT_VOTE_SUCCESS = 'SUBMIT_VOTE_SUCCESS';
export const SUBMIT_VOTE_FAILURE = 'SUBMIT_VOTE_FAILURE';

export type tBeginAction = tAction<typeof SUBMIT_VOTE_BEGIN>;
export type tSuccessAction = tAction<typeof SUBMIT_VOTE_SUCCESS, tThunk<tSession>>;
export type tFailureAction = tAction<typeof SUBMIT_VOTE_FAILURE, Error>;
export type tActionUnion = tBeginAction | tSuccessAction | tFailureAction;

