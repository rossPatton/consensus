export const DELETE_FAILURE = '@@usersByOrgId/DELETE_FAILURE';
export const DELETE_SUCCESS = '@@usersByOrgId/DELETE_SUCCESS';
export type tFailureAction = tAction<typeof DELETE_FAILURE, tResponseError>;
export type tSuccessAction = tAction<typeof DELETE_SUCCESS, {userId: number}>;
