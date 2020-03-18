export const GET_FAILURE = '@user/GET_FAILURE';
export const GET_SUCCESS = '@user/GET_SUCCESS';
export type tFailureAction = tAction<typeof GET_FAILURE, tResponseError>;
export type tSuccessAction = tAction<typeof GET_SUCCESS, tUser>;

