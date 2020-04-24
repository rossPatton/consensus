export const PATCH_INIT = '@@rsvps/PATCH_INIT';
export const PATCH_FAILURE = '@@rsvps/PATCH_FAILURE';
export const PATCH_SUCCESS = '@@rsvps/PATCH_SUCCESS';
export type tInitAction = tAction<typeof PATCH_INIT>;
export type tFailureAction = tAction<typeof PATCH_FAILURE, tResponseError>;
export type tSuccessAction = tAction<typeof PATCH_SUCCESS, tRSVP>;
