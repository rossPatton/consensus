export const GET_RSVPS_BEGIN = 'GET_RSVPS_BEGIN';
export const GET_RSVPS_SUCCESS = 'GET_RSVPS_SUCCESS';
export const GET_RSVPS_FAILURE = 'GET_RSVPS_FAILURE';

export const SET_RSVP_BEGIN = 'SET_RSVP_BEGIN';
export const SET_RSVP_SUCCESS = 'SET_RSVP_SUCCESS';
export const SET_RSVP_FAILURE = 'SET_RSVP_FAILURE';

export type tGetBeginAction = tAction<typeof GET_RSVPS_BEGIN, tLogin>;
export type tGetSuccessAction = tAction<typeof GET_RSVPS_SUCCESS, tSession>;
export type tGetFailureAction = tAction<typeof GET_RSVPS_FAILURE, Error>;
export type tGetActionUnion = tGetBeginAction
  | tGetSuccessAction
  | tGetFailureAction;

export type tSetBeginAction = tAction<typeof SET_RSVP_BEGIN, tLogin>;
export type tSetSuccessAction = tAction<typeof SET_RSVP_SUCCESS, tSession>;
export type tSetFailureAction = tAction<typeof SET_RSVP_FAILURE, Error>;
export type tSetActionUnion = tSetBeginAction
  | tSetSuccessAction
  | tSetFailureAction;

export type tSessionUnion = tGetActionUnion | tSetActionUnion;
