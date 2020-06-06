export const VALIDATE_INIT = '@@tokens/VALIDATE_INIT';
export const VALIDATE_FAILURE = '@@tokens/VALIDATE_FAILURE';
export const VALIDATE_SUCCESS = '@@tokens/VALIDATE_SUCCESS';
export type tInitAction = ts.action<typeof VALIDATE_INIT>;
export type tFailureAction = ts.action<typeof VALIDATE_FAILURE, ts.responseError>;
export type tSuccessAction = ts.action<typeof VALIDATE_SUCCESS, ts.city[]>;
