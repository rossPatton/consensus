export const GET_FAILURE = '@@eventsByUserId/GET_FAILURE';
export const GET_SUCCESS = '@@eventsByUserId/GET_SUCCESS';
export type tFailureAction = tAction<typeof GET_FAILURE, Error>;
export type tSuccessAction = tAction<typeof GET_SUCCESS, tEvent[]>;
