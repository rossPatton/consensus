export const GET_FAILURE = '@@orgs/GET_ORGS_FAILURE';
export const GET_SUCCESS = '@@orgs/GET_ORGS_SUCCESS';
export type tFailureAction = tAction<typeof GET_FAILURE, tResponseError>;
export type tSuccessAction = tAction<typeof GET_SUCCESS, tOrg[]>;
