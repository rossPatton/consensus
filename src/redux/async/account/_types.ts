export const PATCH_ACCOUNT_BEGIN = 'PATCH_ACCOUNT_BEGIN';
export const PATCH_ACCOUNT_SUCCESS = 'PATCH_ACCOUNT_SUCCESS';
export const PATCH_ACCOUNT_FAILURE = 'PATCH_ACCOUNT_FAILURE';

export type tBeginAction = tAction<typeof PATCH_ACCOUNT_BEGIN>;
export type tSuccessAction = tAction<typeof PATCH_ACCOUNT_SUCCESS, tThunk<tSession>>;
export type tFailureAction = tAction<typeof PATCH_ACCOUNT_FAILURE, Error>;
export type tActionUnion = tBeginAction | tSuccessAction | tFailureAction;

