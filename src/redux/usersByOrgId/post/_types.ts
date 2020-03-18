export const POST_FAILURE = '@@usersByOrgId/POST_FAILURE';
export const POST_SUCCESS = '@@usersByOrgId/POST_SUCCESS';
export type tFailureAction = tAction<typeof POST_FAILURE, tResponseError>;
export type tSuccessAction = tAction<typeof POST_SUCCESS, tUser>;
