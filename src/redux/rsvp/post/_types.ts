export const POST_FAILURE = '@@rsvp/POST_FAILURE';
export const POST_SUCCESS = '@@rsvp/POST_SUCCESS';
export type tFailureAction = tAction<typeof POST_FAILURE, Error>;
export type tSuccessAction = tAction<typeof POST_SUCCESS, tRSVP>;
