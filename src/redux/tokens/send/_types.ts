export const SEND_INIT = '@@tokens/SEND_INIT';
export const SEND_FAILURE = '@@tokens/SEND_FAILURE';
export const SEND_SUCCESS = '@@tokens/SEND_SUCCESS';
export type tInitAction = ts.action<typeof SEND_INIT>;
export type tFailureAction = ts.action<typeof SEND_FAILURE, ts.responseError>;
export type tSuccessAction = ts.action<typeof SEND_SUCCESS, any>;
