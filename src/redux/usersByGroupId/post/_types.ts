export const POST_INIT = '@@usersByGroupId/POST_INIT';
export const POST_FAILURE = '@@usersByGroupId/POST_FAILURE';
export const POST_SUCCESS = '@@usersByGroupId/POST_SUCCESS';
export type tInitAction = ts.action<typeof POST_INIT>;
export type tFailureAction = ts.action<typeof POST_FAILURE, ts.responseError>;
export type tSuccessAction = ts.action<typeof POST_SUCCESS, ts.user>;

