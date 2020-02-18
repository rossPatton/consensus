export const GET_FAILURE = '@@eventsByLocation/GET_FAILURE';
export const GET_SUCCESS = '@@eventsByLocation/GET_SUCCESS';
export type tFailureAction = tAction<typeof GET_FAILURE, Error>;
export type tSuccessAction = tAction<typeof GET_SUCCESS, tEvent[]>;
