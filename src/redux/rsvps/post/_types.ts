export const POST_FAILURE = '@@rsvps/POST_FAILURE';
export const POST_SUCCESS = '@@rsvps/POST_SUCCESS';
export type tFailureAction = tAction<typeof POST_FAILURE, tResponseError>;
export type tSuccessAction = tAction<typeof POST_SUCCESS, tRSVP>;
