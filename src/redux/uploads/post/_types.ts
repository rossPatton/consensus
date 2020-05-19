export const POST_INIT = '@@uploads/POST_INIT';
export const POST_FAILURE = '@@uploads/POST_FAILURE';
export const POST_SUCCESS = '@@uploads/POST_SUCCESS';
export type tInitAction = ts.action<typeof POST_INIT>;
export type tFailureAction = ts.action<typeof POST_FAILURE, ts.responseError>;
export type tSuccessAction = ts.action<typeof POST_SUCCESS, ts.upload>;
