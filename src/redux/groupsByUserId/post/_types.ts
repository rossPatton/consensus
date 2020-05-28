export const POST_INIT = '@@groupsByUserId/POST_INIT';
export const POST_SUCCESS = '@@groupsByUserId/POST_SUCCESS';
export const POST_FAILURE = '@@groupsByUserId/POST_FAILURE';
export type tInitAction = ts.action<typeof POST_INIT>;
export type tFailureAction = ts.action<typeof POST_FAILURE, ts.responseError>;
export type tSuccessAction = ts.action<typeof POST_SUCCESS, ts.group>;
