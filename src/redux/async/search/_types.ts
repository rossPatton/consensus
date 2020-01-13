export const GET_ORGS_BY_SEARCH_BEGIN = 'GET_ORGS_BY_SEARCH_BEGIN';
export const GET_ORGS_BY_SEARCH_SUCCESS = 'GET_ORGS_BY_SEARCH_SUCCESS';
export const GET_ORGS_BY_SEARCH_FAILURE = 'GET_ORGS_BY_SEARCH_FAILURE';

export type tBeginAction = tAction<typeof GET_ORGS_BY_SEARCH_BEGIN>;

export type tSuccessAction = tAction<
  typeof GET_ORGS_BY_SEARCH_SUCCESS,
  tThunk<tOrg[] | tOrg>
>;

export type tFailureAction = tAction<
  typeof GET_ORGS_BY_SEARCH_FAILURE,
  Error
>;

export type tActionUnion = tBeginAction | tSuccessAction | tFailureAction;
