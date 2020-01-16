export const DELETE_ORG_BY_USER_BEGIN = 'DELETE_ORG_BY_USER_BEGIN';
export const DELETE_ORG_BY_USER_SUCCESS = 'DELETE_ORG_BY_USER_SUCCESS';
export const DELETE_ORG_BY_USER_FAILURE = 'DELETE_ORG_BY_USER_FAILURE';

export const GET_ORGS_BEGIN = 'GET_ORGS_BEGIN';
export const GET_ORGS_SUCCESS = 'GET_ORGS_SUCCESS';
export const GET_ORGS_FAILURE = 'GET_ORGS_FAILURE';

export const GET_ORGS_BY_SESSION_BEGIN = 'GET_ORGS_BY_SESSION_BEGIN';
export const GET_ORGS_BY_SESSION_SUCCESS = 'GET_ORGS_BY_SESSION_SUCCESS';
export const GET_ORGS_BY_SESSION_FAILURE = 'GET_ORGS_BY_SESSION_FAILURE';

export const GET_ORGS_BY_USER_BEGIN = 'GET_ORGS_BY_USER_BEGIN';
export const GET_ORGS_BY_USER_SUCCESS = 'GET_ORGS_BY_USER_SUCCESS';
export const GET_ORGS_BY_USER_FAILURE = 'GET_ORGS_BY_USER_FAILURE';

export type tBeginAction = tAction<
  typeof GET_ORGS_BEGIN
  | typeof GET_ORGS_BY_SESSION_BEGIN
  | typeof GET_ORGS_BY_USER_BEGIN
  | typeof DELETE_ORG_BY_USER_BEGIN
>;

export type tSuccessAction = tAction<
  typeof GET_ORGS_SUCCESS
  | typeof GET_ORGS_BY_SESSION_SUCCESS
  | typeof GET_ORGS_BY_USER_SUCCESS
  | typeof DELETE_ORG_BY_USER_SUCCESS,
  tThunk<tOrg[] | tOrg>
>;

export type tFailureAction = tAction<
  typeof GET_ORGS_FAILURE
  | typeof GET_ORGS_BY_SESSION_FAILURE
  | typeof GET_ORGS_BY_USER_FAILURE
  | typeof DELETE_ORG_BY_USER_FAILURE,
  Error
>;

export type tActionUnion = tBeginAction | tSuccessAction | tFailureAction;
