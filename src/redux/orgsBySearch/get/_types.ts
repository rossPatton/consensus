export const GET_FAILURE = '@@orgsBySearch/GET_FAILURE';
export const GET_SUCCESS = '@@orgsBySearch/GET_SUCCESS';
export type tFailureAction = tAction<typeof GET_FAILURE, tResponseError>;
export type tSuccessAction = tAction<typeof GET_SUCCESS, tOrg[]>;
