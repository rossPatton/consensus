export const GET_FAILURE = '@@rsvps/GET_FAILURE';
export const GET_SUCCESS = '@@rsvps/GET_SUCCESS';
export type tFailureAction = tAction<typeof GET_FAILURE, Error>;
export type tSuccessAction = tAction<typeof GET_SUCCESS, tRSVP[]>;
