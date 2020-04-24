export const DELETE_INIT = '@@roles/DELETE_INIT';
export const DELETE_FAILURE = '@@roles/DELETE_FAILURE';
export const DELETE_SUCCESS = '@@roles/DELETE_SUCCESS';
export type tInitAction = tAction<typeof DELETE_INIT>;
export type tFailureAction = tAction<typeof DELETE_FAILURE, tResponseError>;
export type tSuccessAction = tAction<typeof DELETE_SUCCESS, tRoleMap>;
