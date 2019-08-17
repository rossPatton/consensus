export const GET_EVENT_BY_ID_BEGIN = 'GET_EVENT_BY_ID_BEGIN';
export const GET_EVENT_BY_ID_SUCCESS = 'GET_EVENT_BY_ID_SUCCESS';
export const GET_EVENT_BY_ID_FAILURE = 'GET_EVENT_BY_ID_FAILURE';

export type tBeginAction = tAction<typeof GET_EVENT_BY_ID_BEGIN>;
export type tSuccessAction = tAction<typeof GET_EVENT_BY_ID_SUCCESS, tEvent>;
export type tFailureAction = tAction<typeof GET_EVENT_BY_ID_FAILURE, Error>;
export type tActionUnion = tBeginAction | tSuccessAction | tFailureAction;
