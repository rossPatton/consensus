export const DELETE_INIT = '@@meetingsByGroupId/DELETE_INIT';
export const DELETE_FAILURE = '@@meetingsByGroupId/DELETE_FAILURE';
export const DELETE_SUCCESS = '@@meetingsByGroupId/DELETE_SUCCESS';
export type tInitAction = ts.action<typeof DELETE_INIT>;
export type tFailureAction = ts.action<typeof DELETE_FAILURE, ts.responseError>;
export type tSuccessAction = ts.action<typeof DELETE_SUCCESS, ts.idQuery>;
