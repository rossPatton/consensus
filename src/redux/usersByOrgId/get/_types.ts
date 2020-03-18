export const GET_FAILURE = '@@usersByOrgId/GET_FAILURE';
export const GET_SUCCESS = '@@usersByOrgId/GET_SUCCESS';
export type tFailureAction = tAction<typeof GET_FAILURE, tResponseError>;
export type tSuccessAction = tAction<typeof GET_SUCCESS, tUser[]>;
