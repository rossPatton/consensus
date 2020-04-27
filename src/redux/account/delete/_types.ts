export const DELETE_INIT = '@@account/DELETE_INIT';
export const DELETE_FAILURE = '@@account/DELETE_FAILURE';
export const DELETE_SUCCESS = '@@account/DELETE_SUCCESS';
export type tInitAction = tAction<typeof DELETE_INIT>;
export type tFailureAction = tAction<typeof DELETE_FAILURE, tResponseError>;
export type tSuccessAction = tAction<typeof DELETE_SUCCESS, ts.session>;

