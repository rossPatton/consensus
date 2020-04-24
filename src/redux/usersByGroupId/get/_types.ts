export const GET_FAILURE = '@@usersByGroupId/GET_FAILURE';
export const GET_SUCCESS = '@@usersByGroupId/GET_SUCCESS';
export type tFailureAction = tAction<typeof GET_FAILURE, tResponseError>;
export type tSuccessAction = tAction<typeof GET_SUCCESS, tUser[]>;
