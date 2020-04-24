export const DELETE_INIT = '@@usersByGroupId/DELETE_INIT';
export const DELETE_FAILURE = '@@usersByGroupId/DELETE_FAILURE';
export const DELETE_SUCCESS = '@@usersByGroupId/DELETE_SUCCESS';
export type tInitAction = tAction<typeof DELETE_INIT>;
export type tFailureAction = tAction<typeof DELETE_FAILURE, tResponseError>;
export type tSuccessAction = tAction<typeof DELETE_SUCCESS, {userId: number}>;
