export const GET_INIT = '@@city/GET_INIT';
export const GET_FAILURE = '@@city/GET_FAILURE';
export const GET_SUCCESS = '@@city/GET_SUCCESS';
export type tInitAction = tAction<typeof GET_INIT>;
export type tFailureAction = tAction<typeof GET_FAILURE, tResponseError>;
export type tSuccessAction = tAction<typeof GET_SUCCESS, tCity>;
