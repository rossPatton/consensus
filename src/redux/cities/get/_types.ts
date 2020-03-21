export const GET_FAILURE = '@@cities/GET_FAILURE';
export const GET_SUCCESS = '@@cities/GET_SUCCESS';
export type tFailureAction = tAction<typeof GET_FAILURE, tResponseError>;
export type tSuccessAction = tAction<typeof GET_SUCCESS, tCity[]>;
