export const DELETE_INIT = '@@account/DELETE_INIT';
export const DELETE_FAILURE = '@@account/DELETE_FAILURE';
export const DELETE_SUCCESS = '@@account/DELETE_SUCCESS';
export type tInitAction = ts.action<typeof DELETE_INIT>;
export type tFailureAction = ts.action<typeof DELETE_FAILURE, ts.responseError>;
export type tSuccessAction = ts.action<typeof DELETE_SUCCESS, ts.session>;

