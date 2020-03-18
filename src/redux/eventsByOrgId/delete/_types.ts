export const DELETE_FAILURE = '@@eventsByOrgId/DELETE_FAILURE';
export const DELETE_SUCCESS = '@@eventsByOrgId/DELETE_SUCCESS';
export type tFailureAction = tAction<typeof DELETE_FAILURE, tResponseError>;
export type tSuccessAction = tAction<typeof DELETE_SUCCESS, tIdQuery>;
