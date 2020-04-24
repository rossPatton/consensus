export const DELETE_INIT = '@@meetingsByGroupId/DELETE_INIT';
export const DELETE_FAILURE = '@@meetingsByGroupId/DELETE_FAILURE';
export const DELETE_SUCCESS = '@@meetingsByGroupId/DELETE_SUCCESS';
export type tInitAction = tAction<typeof DELETE_INIT>;
export type tFailureAction = tAction<typeof DELETE_FAILURE, tResponseError>;
export type tSuccessAction = tAction<typeof DELETE_SUCCESS, tIdQuery>;
