export const GET_FAILURE = '@@rsvp/GET_FAILURE';
export const GET_SUCCESS = '@@rsvp/GET_SUCCESS';
export type tFailureAction = tAction<typeof GET_FAILURE, Error>;
export type tSuccessAction = tAction<typeof GET_SUCCESS, tRSVP[]>;
