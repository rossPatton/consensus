export const POST_INIT = '@@user/POST_INIT';
export const POST_FAILURE = '@@user/POST_FAILURE';
export const POST_SUCCESS = '@@user/POST_SUCCESS';
export type tInitAction = ts.action<typeof POST_INIT>;
export type tFailureAction = ts.action<typeof POST_FAILURE, ts.responseError>;
export type tSuccessAction = ts.action<typeof POST_SUCCESS, ts.user>;

