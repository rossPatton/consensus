export const DELETE_INIT = '@@groupsByUserId/DELETE_INIT';
export const DELETE_FAILURE = '@@groupsByUserId/DELETE_FAILURE';
export const DELETE_SUCCESS = '@@groupsByUserId/DELETE_SUCCESS';
export type tInitAction = ts.action<typeof DELETE_INIT>;
export type tFailureAction = ts.action<typeof DELETE_FAILURE, ts.responseError>;
export type tSuccessAction = ts.action<
  typeof DELETE_SUCCESS,
  {ok: true, groupId: number}
>;
