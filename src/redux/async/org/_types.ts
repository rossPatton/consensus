export const GET_ORG_BEGIN = 'GET_ORG_BEGIN';
export const GET_ORG_SUCCESS = 'GET_ORG_SUCCESS';
export const GET_ORG_FAILURE = 'GET_ORG_FAILURE';

export const PATCH_ORG_BEGIN = 'PATCH_ORG_BEGIN';
export const PATCH_ORG_SUCCESS = 'PATCH_ORG_SUCCESS';
export const PATCH_ORG_FAILURE = 'PATCH_ORG_FAILURE';

export type tBeginAction = tAction<typeof GET_ORG_BEGIN | typeof PATCH_ORG_BEGIN>;

export type tSuccessAction = tAction<
  typeof GET_ORG_SUCCESS | typeof PATCH_ORG_SUCCESS,
  tThunk<tOrg>
>;

export type tFailureAction = tAction<
  typeof GET_ORG_FAILURE | typeof PATCH_ORG_FAILURE,
  Error
>;

export type tActionUnion = tBeginAction | tSuccessAction | tFailureAction;
