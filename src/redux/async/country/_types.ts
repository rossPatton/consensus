export const GET_COUNTRY_BEGIN = 'GET_COUNTRY_BEGIN';
export const GET_COUNTRY_SUCCESS = 'GET_COUNTRY_SUCCESS';
export const GET_COUNTRY_FAILURE = 'GET_COUNTRY_FAILURE';

export type tBeginAction = tAction<typeof GET_COUNTRY_BEGIN>;
export type tSuccessAction = tAction<typeof GET_COUNTRY_SUCCESS, any>;
export type tFailureAction = tAction<typeof GET_COUNTRY_FAILURE, Error>;
export type tActionUnion = tBeginAction | tSuccessAction | tFailureAction;
