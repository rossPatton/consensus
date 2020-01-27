export const DELETE_FAILURE = '@@event/DELETE_EVENT_FAILURE';
export const DELETE_SUCCESS = '@@event/DELETE_EVENT_SUCCESS';
export type tFailureAction = tAction<typeof DELETE_FAILURE, Error>;
export type tSuccessAction = tAction<typeof DELETE_SUCCESS, {ok: boolean}>;
