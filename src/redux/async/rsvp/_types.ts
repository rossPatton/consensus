export const GET_RSVP_BEGIN = 'GET_RSVP_BEGIN';
export const GET_RSVP_SUCCESS = 'GET_RSVP_SUCCESS';
export const GET_RSVP_FAILURE = 'GET_RSVP_FAILURE';

export const SET_RSVP_BEGIN = 'SET_RSVP_BEGIN';
export const SET_RSVP_SUCCESS = 'SET_RSVP_SUCCESS';
export const SET_RSVP_FAILURE = 'SET_RSVP_FAILURE';

export type tGetBeginAction = tAction<typeof GET_RSVP_BEGIN, tLogin>;
export type tGetSuccessAction = tAction<typeof GET_RSVP_SUCCESS, tSession>;
export type tGetFailureAction = tAction<typeof GET_RSVP_FAILURE, Error>;
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
