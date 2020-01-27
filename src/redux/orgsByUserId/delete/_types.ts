export const DELETE_FAILURE = '@@orgsByUserId/DELETE_FAILURE';
export const DELETE_SUCCESS = '@@orgsByUserId/DELETE_SUCCESS';
export type tFailureAction = tAction<typeof DELETE_FAILURE, Error>;
export type tSuccessAction = tAction<
  typeof DELETE_SUCCESS,
  {ok: true, orgId: number}
>;
