export const GET_FAILURE = '@@event/GET_EVENT_FAILURE';
export const GET_SUCCESS = '@@event/GET_EVENT_SUCCESS';
export type tFailureAction = tAction<typeof GET_FAILURE, Error>;
export type tSuccessAction = tAction<typeof GET_SUCCESS, tEvent>;
