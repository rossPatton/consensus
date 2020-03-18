export const POST_SUCCESS = '@@org/POST_SUCCESS';
export const POST_FAILURE = '@@org/POST_FAILURE';
export type tFailureAction = tAction<typeof POST_FAILURE, tResponseError>;
export type tSuccessAction = tAction<typeof POST_SUCCESS, tOrg>;
