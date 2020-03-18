export const GET_FAILURE = '@@eventsByOrgId/GET_FAILURE';
export const GET_SUCCESS = '@@eventsByOrgId/GET_SUCCESS';
export type tFailureAction = tAction<typeof GET_FAILURE, tResponseError>;
export type tSuccessAction = tAction<typeof GET_SUCCESS, tEvent[]>;
