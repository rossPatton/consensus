export const POST_FAILURE = '@@user/POST_FAILURE';
export const POST_SUCCESS = '@@user/POST_SUCCESS';
export type tFailureAction = tAction<typeof POST_FAILURE, Error>;
export type tSuccessAction = tAction<typeof POST_SUCCESS, tUser>;

