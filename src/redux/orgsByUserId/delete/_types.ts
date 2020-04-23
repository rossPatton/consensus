export const DELETE_INIT = '@@orgsByUserId/DELETE_INIT';
export const DELETE_FAILURE = '@@orgsByUserId/DELETE_FAILURE';
export const DELETE_SUCCESS = '@@orgsByUserId/DELETE_SUCCESS';
export type tInitAction = tAction<typeof DELETE_INIT>;
export type tFailureAction = tAction<typeof DELETE_FAILURE, tResponseError>;
export type tSuccessAction = tAction<
  typeof DELETE_SUCCESS,
  {ok: true, orgId: number}
>;
