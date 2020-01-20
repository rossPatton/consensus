export const GET_RSVPS_BEGIN = 'GET_RSVPS_BEGIN';
export const GET_RSVPS_SUCCESS = 'GET_RSVPS_SUCCESS';
export const GET_RSVPS_FAILURE = 'GET_RSVPS_FAILURE';

export type tGetBeginAction = tAction<typeof GET_RSVPS_BEGIN>;
export type tGetSuccessAction = tAction<typeof GET_RSVPS_SUCCESS, tRSVP[]>;
export type tGetFailureAction = tAction<typeof GET_RSVPS_FAILURE, Error>;
export type tGetActionUnion = tGetBeginAction
  | tGetSuccessAction
  | tGetFailureAction;

export type tGetRSVPUnion = tGetActionUnion;
