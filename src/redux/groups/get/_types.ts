export const GET_INIT = '@@groups/GET_INIT';
export const GET_SUCCESS = '@@groups/GET_SUCCESS';
export const GET_FAILURE = '@@groups/GET_FAILURE';
export type tInitAction = tAction<typeof GET_INIT>;
export type tFailureAction = tAction<typeof GET_FAILURE, tResponseError>;
export type tSuccessAction = tAction<typeof GET_SUCCESS, tGroup[]>;
