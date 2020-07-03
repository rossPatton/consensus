export const CHECK_FAILURE = '@@checked/CHECK_FAILURE';
export const CHECK_SUCCESS = '@@checked/CHECK_SUCCESS';
export type tFailureAction = ts.action<typeof CHECK_FAILURE, ts.responseError>;
export type tSuccessAction = ts.action<typeof CHECK_SUCCESS, object>;
export type tActions = tFailureAction | tSuccessAction;
