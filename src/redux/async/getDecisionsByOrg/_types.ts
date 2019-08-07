export const GET_DECISIONS_BY_ORG_BEGIN = 'GET_DECISIONS_BY_ORG_BEGIN';
export const GET_DECISIONS_BY_ORG_SUCCESS = 'GET_DECISIONS_BY_ORG_SUCCESS';
export const GET_DECISIONS_BY_ORG_FAILURE = 'GET_DECISIONS_BY_ORG_FAILURE';

export type tBeginAction = tAction<typeof GET_DECISIONS_BY_ORG_BEGIN>;
export type tSuccessAction = tAction<
  typeof GET_DECISIONS_BY_ORG_SUCCESS,
  tThunk<tDecision[]>
>;
export type tFailureAction = tAction<typeof GET_DECISIONS_BY_ORG_FAILURE, Error>;
export type tActionUnion = tBeginAction | tSuccessAction | tFailureAction;
