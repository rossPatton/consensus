export const GET_INIT = '@@rsvps/GET_INIT';
export const GET_FAILURE = '@@rsvps/GET_FAILURE';
export const GET_SUCCESS = '@@rsvps/GET_SUCCESS';
export type tInitAction = tAction<typeof GET_INIT>;
export type tFailureAction = tAction<typeof GET_FAILURE, Error>;
export type tSuccessAction = tAction<typeof GET_SUCCESS, tRSVP[]>;
