export const PATCH_FAILURE = '@@usersByOrgId/PATCH_FAILURE';
export const PATCH_SUCCESS = '@@usersByOrgId/PATCH_SUCCESS';
export type tFailureAction = tAction<typeof PATCH_FAILURE, Error>;
export type tSuccessAction = tAction<typeof PATCH_SUCCESS, tAccountRoleRelation>;
