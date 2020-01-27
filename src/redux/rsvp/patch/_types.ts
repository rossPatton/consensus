export const PATCH_SUCCESS = '@@rsvp/PATCH_SUCCESS';
export const PATCH_FAILURE = '@@rsvp/PATCH_FAILURE';
export type tSuccessAction = tAction<typeof PATCH_SUCCESS, tRSVP>;
export type tFailureAction = tAction<typeof PATCH_FAILURE, Error>;
