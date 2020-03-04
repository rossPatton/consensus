export const DELETE_FAILURE = '@@account/DELETE_FAILURE';
export const DELETE_SUCCESS = '@@account/DELETE_FAILURE';
export type tFailureAction = tAction<typeof DELETE_FAILURE, Error>;
export type tSuccessAction = tAction<typeof DELETE_SUCCESS, tSession>;

