export const PATCH_FAILURE = '@@rsvps/PATCH_FAILURE';
export const PATCH_SUCCESS = '@@rsvps/PATCH_SUCCESS';
export type tFailureAction = tAction<typeof PATCH_FAILURE, Error>;
export type tSuccessAction = tAction<typeof PATCH_SUCCESS, tRSVP>;
