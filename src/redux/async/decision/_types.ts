export const GET_DECISION_BEGIN = 'GET_DECISION_BEGIN';
export const GET_DECISION_SUCCESS = 'GET_DECISION_SUCCESS';
export const GET_DECISION_FAILURE = 'GET_DECISION_FAILURE';

export const POST_DECISION_BEGIN = 'POST_DECISION_BEGIN';
export const POST_DECISION_SUCCESS = 'POST_DECISION_SUCCESS';
export const POST_DECISION_FAILURE = 'POST_DECISION_FAILURE';

export type tBeginAction = tAction<typeof GET_DECISION_BEGIN | typeof POST_DECISION_BEGIN>;
export type tSuccessAction = tAction<
  typeof GET_DECISION_SUCCESS
  | typeof POST_DECISION_SUCCESS,
  tThunk<tDecision>
>;
export type tFailureAction = tAction<
  typeof GET_DECISION_FAILURE
  | typeof POST_DECISION_FAILURE,
  Error
>;


export type tActionUnion = tBeginAction | tSuccessAction | tFailureAction;
