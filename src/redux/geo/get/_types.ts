export const GET_FAILURE = '@@geo/GET_FAILURE';
export const GET_SUCCESS = '@@geo/GET_SUCCESS';
export type tFailureAction = tAction<typeof GET_FAILURE, tResponseError>;
export type tSuccessAction = tAction<typeof GET_SUCCESS, tCity>;
