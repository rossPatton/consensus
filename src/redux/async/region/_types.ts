export const GET_REGION_BEGIN = 'GET_REGION_BEGIN';
export const GET_REGION_SUCCESS = 'GET_REGION_SUCCESS';
export const GET_REGION_FAILURE = 'GET_REGION_FAILURE';

export type tBeginAction = tAction<typeof GET_REGION_BEGIN>;
export type tSuccessAction = tAction<typeof GET_REGION_SUCCESS, any>;
export type tFailureAction = tAction<typeof GET_REGION_FAILURE, Error>;
export type tActionUnion = tBeginAction | tSuccessAction | tFailureAction;
