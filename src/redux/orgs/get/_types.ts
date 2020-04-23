export const GET_INIT = '@@orgs/GET_INIT';
export const GET_SUCCESS = '@@orgs/GET_SUCCESS';
export const GET_FAILURE = '@@orgs/GET_FAILURE';
export type tInitAction = tAction<typeof GET_INIT>;
export type tFailureAction = tAction<typeof GET_FAILURE, tResponseError>;
export type tSuccessAction = tAction<typeof GET_SUCCESS, tGroup[]>;
