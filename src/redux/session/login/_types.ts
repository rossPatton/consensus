export const LOGIN_FAILURE = '@@auth/LOGIN_FAILURE';
export const LOGIN_SUCCESS = '@@auth/LOGIN_SUCCESS';
export type tFailureAction = tAction<typeof LOGIN_FAILURE, tResponseError>;
export type tSuccessAction = tAction<typeof LOGIN_SUCCESS, tSession>;
