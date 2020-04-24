export const DELETE_INIT = '@@groupsByUserId/DELETE_INIT';
export const DELETE_FAILURE = '@@groupsByUserId/DELETE_FAILURE';
export const DELETE_SUCCESS = '@@groupsByUserId/DELETE_SUCCESS';
export type tInitAction = tAction<typeof DELETE_INIT>;
export type tFailureAction = tAction<typeof DELETE_FAILURE, tResponseError>;
export type tSuccessAction = tAction<
  typeof DELETE_SUCCESS,
  {ok: true, groupId: number}
>;
