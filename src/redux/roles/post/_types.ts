export const POST_FAILURE = '@@roles/POST_FAILURE';
export const POST_SUCCESS = '@@roles/POST_SUCCESS';
export type tFailureAction = tAction<typeof POST_FAILURE, tResponseError>;
export type tSuccessAction = tAction<typeof POST_SUCCESS, tRoleMap>;
