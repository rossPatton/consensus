export const GET_FAILURE = '@@org/GET_FAILURE';
export const GET_SUCCESS = '@@org/GET_SUCCESS';
export type tFailureAction = tAction<typeof GET_FAILURE, Error>;
export type tSuccessAction = tAction<typeof GET_SUCCESS, tOrg>;
