export const POST_EVENT_BEGIN = 'POST_EVENT_BEGIN';
export const POST_EVENT_SUCCESS = 'POST_EVENT_SUCCESS';
export const POST_EVENT_FAILURE = 'POST_EVENT_FAILURE';

export type tBeginAction = tAction<typeof POST_EVENT_BEGIN>;
export type tSuccessAction = tAction<typeof POST_EVENT_SUCCESS, tEvent>;
export type tFailureAction = tAction<typeof POST_EVENT_FAILURE, Error>;
export type tActionUnion = tBeginAction | tSuccessAction | tFailureAction;
