export const POST_INIT = '@@rsvps/POST_INIT';
export const POST_FAILURE = '@@rsvps/POST_FAILURE';
export const POST_SUCCESS = '@@rsvps/POST_SUCCESS';
export type tInitAction = ts.action<typeof POST_INIT>;
export type tFailureAction = ts.action<typeof POST_FAILURE, ts.responseError>;
export type tSuccessAction = ts.action<typeof POST_SUCCESS, ts.rsvp>;
