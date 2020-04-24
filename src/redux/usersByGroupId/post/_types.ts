export const POST_FAILURE = '@@usersByGroupId/POST_FAILURE';
export const POST_SUCCESS = '@@usersByGroupId/POST_SUCCESS';
export type tFailureAction = tAction<typeof POST_FAILURE, tResponseError>;
export type tSuccessAction = tAction<typeof POST_SUCCESS, tUser>;
