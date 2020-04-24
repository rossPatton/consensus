export const POST_INIT = '@@group/POST_INIT';
export const POST_SUCCESS = '@@group/POST_SUCCESS';
export const POST_FAILURE = '@@group/POST_FAILURE';
export type tInitAction = tAction<typeof POST_INIT>;
export type tFailureAction = tAction<typeof POST_FAILURE, tResponseError>;
export type tSuccessAction = tAction<typeof POST_SUCCESS, tGroup>;
