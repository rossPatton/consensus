export const GET_FAILURE = '@@country/GET_FAILURE';
export const GET_SUCCESS = '@@country/GET_SUCCESS';
export type tFailureAction = tAction<typeof GET_FAILURE, tResponseError>;
export type tSuccessAction = tAction<typeof GET_SUCCESS, tCountry>;
