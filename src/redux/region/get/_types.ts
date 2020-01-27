export const GET_FAILURE = '@@region/GET_FAILURE';
export const GET_SUCCESS = '@@region/GET_SUCCESS';
export type tFailureAction = tAction<typeof GET_FAILURE, Error>;
export type tSuccessAction = tAction<typeof GET_SUCCESS, any>;
