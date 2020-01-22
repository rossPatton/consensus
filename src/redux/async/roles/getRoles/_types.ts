export const GET_ROLES_BEGIN = 'GET_ROLES_BEGIN';
export const GET_ROLES_SUCCESS = 'GET_ROLES_SUCCESS';
export const GET_ROLES_FAILURE = 'GET_ROLES_FAILURE';

export type tBeginAction = tAction<typeof GET_ROLES_BEGIN>;
export type tSuccessAction = tAction<typeof GET_ROLES_SUCCESS, tRoleMap[]>;
export type tFailureAction = tAction<typeof GET_ROLES_FAILURE, Error>;

export type tActionUnion = tBeginAction | tSuccessAction | tFailureAction;
