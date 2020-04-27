export const POST_INIT = '@@roles/POST_INIT';
export const POST_FAILURE = '@@roles/POST_FAILURE';
export const POST_SUCCESS = '@@roles/POST_SUCCESS';
export type tInitAction = tAction<typeof POST_INIT>;
export type tFailureAction = tAction<typeof POST_FAILURE, tResponseError>;
export type tSuccessAction = tAction<typeof POST_SUCCESS, ts.roleMap>;
