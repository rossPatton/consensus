export const LOGOUT_FAILURE = '@@auth/v1/LOGOUT_FAILURE';
export const LOGOUT_SUCCESS = '@@auth/v1/LOGOUT_SUCCESS';
export type tFailureAction = tAction<typeof LOGOUT_FAILURE, Error>;
export type tSuccessAction = tAction<typeof LOGOUT_SUCCESS, {isAuthenticated: false}>;
