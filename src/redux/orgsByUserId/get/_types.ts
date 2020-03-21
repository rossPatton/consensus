export const GET_FAILURE = '@@orgsByUserId/GET_FAILURE';
export const GET_SUCCESS = '@@orgsByUserId/GET_SUCCESS';
export type tFailureAction = tAction<typeof GET_FAILURE, tResponseError>;
export type tSuccessAction = tAction<typeof GET_SUCCESS, tGroup[]>;
