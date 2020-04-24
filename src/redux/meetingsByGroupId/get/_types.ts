export const GET_INIT = '@@meetingsByGroupId/GET_INIT';
export const GET_FAILURE = '@@meetingsByGroupId/GET_FAILURE';
export const GET_SUCCESS = '@@meetingsByGroupId/GET_SUCCESS';
export type tInitAction = tAction<typeof GET_INIT>;
export type tFailureAction = tAction<typeof GET_FAILURE, tResponseError>;
export type tSuccessAction = tAction<typeof GET_SUCCESS, tMeeting[]>;
