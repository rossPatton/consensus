export const POST_INIT = '@@org/POST_INIT';
export const POST_SUCCESS = '@@org/POST_SUCCESS';
export const POST_FAILURE = '@@org/POST_FAILURE';
export type tInitAction = tAction<typeof POST_INIT>;
export type tFailureAction = tAction<typeof POST_FAILURE, tResponseError>;
export type tSuccessAction = tAction<typeof POST_SUCCESS, tGroup>;
