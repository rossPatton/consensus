export const GET_INIT = '@@cities/GET_INIT';
export const GET_FAILURE = '@@cities/GET_FAILURE';
export const GET_SUCCESS = '@@cities/GET_SUCCESS';
export type tInitAction = tAction<typeof GET_INIT>;
export type tFailureAction = tAction<typeof GET_FAILURE, tResponseError>;
export type tSuccessAction = tAction<typeof GET_SUCCESS, tCity[]>;
