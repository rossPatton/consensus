export const GET_INIT = '@@groupsBySearch/GET_INIT';
export const GET_SUCCESS = '@@groupsBySearch/GET_SUCCESS';
export const GET_FAILURE = '@@groupsBySearch/GET_FAILURE';
export type tInitAction = tAction<typeof GET_INIT>;
export type tFailureAction = tAction<typeof GET_FAILURE, tResponseError>;
export type tSuccessAction = tAction<typeof GET_SUCCESS, tGroup[]>;
