export const GET_FAILURE = '@@roles/GET_FAILURE';
export const GET_SUCCESS = '@@roles/GET_SUCCESS';
export type tFailureAction = tAction<typeof GET_FAILURE, Error>;
export type tSuccessAction = tAction<typeof GET_SUCCESS, tRoleMap[]>;
