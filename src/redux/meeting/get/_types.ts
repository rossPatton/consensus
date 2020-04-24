export const GET_INIT = '@@meeting/GET_INIT';
export const GET_FAILURE = '@@meeting/GET_FAILURE';
export const GET_SUCCESS = '@@meeting/GET_SUCCESS';
export type tInitAction = tAction<typeof GET_INIT>;
export type tFailureAction = tAction<typeof GET_FAILURE, tResponseError>;
export type tSuccessAction = tAction<typeof GET_SUCCESS, tMeetingSingular>;
