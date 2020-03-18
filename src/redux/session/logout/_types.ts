export const LOGOUT_FAILURE = '@@auth/LOGOUT_FAILURE';
export const LOGOUT_SUCCESS = '@@auth/LOGOUT_SUCCESS';
export type tFailureAction = tAction<typeof LOGOUT_FAILURE, tResponseError>;
export type tSuccessAction = tAction<typeof LOGOUT_SUCCESS, {isAuthenticated: false}>;
