export const GET_EVENTS_BEGIN = 'GET_EVENTS_BEGIN';
export const GET_EVENTS_SUCCESS = 'GET_EVENTS_SUCCESS';
export const GET_EVENTS_FAILURE = 'GET_EVENTS_FAILURE';

export type tBeginAction = tAction<typeof GET_EVENTS_BEGIN>;
export type tSuccessAction = tAction<typeof GET_EVENTS_SUCCESS, tThunk<tEvent[]>>;
export type tFailureAction = tAction<typeof GET_EVENTS_FAILURE, Error>;
export type tActionUnion = tBeginAction | tSuccessAction | tFailureAction;
