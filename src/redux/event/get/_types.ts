export const GET_BEGIN = '@@event/GET_SINGLE_EVENT_BEGIN';
export const GET_FAILURE = '@@event/GET_SINGLE_EVENT_FAILURE';
export const GET_SUCCESS = '@@event/GET_SINGLE_EVENT_SUCCESS';
export type tBeginAction = tAction<typeof GET_BEGIN>;
export type tFailureAction = tAction<typeof GET_FAILURE, Error>;
export type tSuccessAction = tAction<typeof GET_SUCCESS, tEvent>;
