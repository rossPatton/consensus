export const GET_VOTES_BEGIN = 'GET_VOTES_BEGIN';
export const GET_VOTES_SUCCESS = 'GET_VOTES_SUCCESS';
export const GET_VOTES_FAILURE = 'GET_VOTES_FAILURE';

export const SUBMIT_VOTE_BEGIN = 'SUBMIT_VOTE_BEGIN';
export const SUBMIT_VOTE_SUCCESS = 'SUBMIT_VOTE_SUCCESS';
export const SUBMIT_VOTE_FAILURE = 'SUBMIT_VOTE_FAILURE';

export type tBeginAction = tAction<typeof SUBMIT_VOTE_BEGIN | typeof GET_VOTES_BEGIN>;

export type tSuccessAction = tAction<
  typeof SUBMIT_VOTE_SUCCESS | typeof GET_VOTES_SUCCESS,
  tThunk<tSession>
>;
export type tFailureAction = tAction<
  typeof SUBMIT_VOTE_FAILURE | typeof GET_VOTES_FAILURE,
  Error
>;

export type tActionUnion = tBeginAction | tSuccessAction | tFailureAction;

