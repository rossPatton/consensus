export const GET_EVENTS_BY_ORG_BEGIN = 'GET_EVENTS_BY_ORG_BEGIN';
export const GET_EVENTS_BY_ORG_SUCCESS = 'GET_EVENTS_BY_ORG_SUCCESS';
export const GET_EVENTS_BY_ORG_FAILURE = 'GET_EVENTS_BY_ORG_FAILURE';

export type tBeginAction = tAction<typeof GET_EVENTS_BY_ORG_BEGIN>;
export type tSuccessAction = tAction<typeof GET_EVENTS_BY_ORG_SUCCESS, tEvent[]>;
export type tFailureAction = tAction<typeof GET_EVENTS_BY_ORG_FAILURE, Error>;
export type tActionUnion = tBeginAction | tSuccessAction | tFailureAction;
