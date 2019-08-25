export const GET_CITY_BEGIN = 'GET_CITY_BEGIN';
export const GET_CITY_SUCCESS = 'GET_CITY_SUCCESS';
export const GET_CITY_FAILURE = 'GET_CITY_FAILURE';

export type tBeginAction = tAction<typeof GET_CITY_BEGIN>;
export type tSuccessAction = tAction<typeof GET_CITY_SUCCESS, any>;
export type tFailureAction = tAction<typeof GET_CITY_FAILURE, Error>;
export type tActionUnion = tBeginAction | tSuccessAction | tFailureAction;
