export const POST_INIT = '@@featuredImage/POST_INIT';
export const POST_FAILURE = '@@featuredImage/POST_FAILURE';
export const POST_SUCCESS = '@@featuredImage/POST_SUCCESS';
export type tInitAction = ts.action<typeof POST_INIT>;
export type tFailureAction = ts.action<typeof POST_FAILURE, ts.responseError>;
export type tSuccessAction = ts.action<typeof POST_SUCCESS, {img: string}>;
