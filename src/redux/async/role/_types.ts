export const GET_ROLE_BEGIN = 'GET_ROLE_BEGIN';
export const GET_ROLE_SUCCESS = 'GET_ROLE_SUCCESS';
export const GET_ROLE_FAILURE = 'GET_ROLE_FAILURE';

export const SET_ROLE = 'SET_ROLE';

export type tBeginAction = tAction<typeof GET_ROLE_BEGIN>;

export type tSuccessAction = tAction<
  typeof GET_ROLE_SUCCESS | typeof SET_ROLE,
  any
>;

export type tFailureAction = tAction<typeof GET_ROLE_FAILURE, Error>;

export type tActionUnion = tBeginAction | tSuccessAction | tFailureAction;
